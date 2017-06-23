import { Activity, singleS3StreamOutput } from 'aries-data';
import Github from 'github';
import promisify from 'es6-promisify';
import flattenDeep from 'lodash.flattendeep';

export default class GithubSource extends Activity {

    @singleS3StreamOutput('json')
    async onTask(activityTask, config) {
        let data = null;

        let client = null;

        client = await this.authenticatedClient(config);


        if (config.repo === 'allUser') return this.getAllUser(config, client);
        if (config.repo === 'allOrg') {
            data = await this.getAllOrg(config, client);
        } else if (typeof this[config.method] === 'function') {
            data = await this[config.method](config, client);
        }
        return data;
    }

    authenticatedClient({ token }) {
        const client = new Github({
            debug: false,
        });
        client.authenticate({
            type: 'token',
            token,
        });
        return client;
    }

    /**
      * @param user String username or org name
      */
    async listIssues({ user, repo, owner }, gh) {
        const getForRepo = promisify(gh.issues.getForRepo, gh);
        let issues = await getForRepo({ owner, repo });
        let returner = issues.data;
        while (gh.hasNextPage(issues)) {
            issues = gh.getNextPage(issues);
            returner = returner.concat(issues.data);
        }
        return returner;
    }

    async listAssignees({ user, repo, owner }, gh) {
        const getAssignees = promisify(gh.issues.getAssignees, gh);
        let assignees = await getAssignees({ owner, repo });
        let returner = assignees.data;
        while (gh.hasNextPage(assignees)) {
            assignees = await gh.getNextPage(assignees);
            returner = returner.concat(assignees.data);
        }
        return returner;
    }

    async listIssueComments({ user, repo, number }, gh) {
        const getComments = promisify(gh.issues.getComments, gh);
        let comments = await getComments({ user, repo, number });
        let returner = comments.data;
        while (gh.hasNextPage(comments)) {
            comments = await gh.getNextPage(comments);
            returner = returner.concat(comments.data);
        }
        return returner;
    }

    async listRepoComments({ user, repo, owner }, gh) {
        const getCommentsForRepo = promisify(gh.issues.getCommentsForRepo, gh);
        let comments = await getCommentsForRepo({ owner, repo });
        let returner = comments.data;
        while (gh.hasNextPage(comments)) {
            comments = await gh.getNextPage(comments);
            returner = returner.concat(comments.data);
        }
        return returner;
    }

    async listIssueEvents({ user, repo, number }, gh) {
        const getEventsTimeline = promisify(gh.issues.getEventsTimeline, gh);
        let events = await getEventsTimeline({ user, repo, number });
        let returner = events.data;
        while (gh.hasNextPage(events)) {
            events = await gh.getNextPage(events);
            returner = returner.concat(events.data);
        }
        return returner;
    }

    async listRepoEvents({ user, repo }, gh) {
        const getEventsForRepo = promisify(gh.issues.getEventsForRepo, gh);
        let events = await getEventsForRepo({ user, repo });
        let returner = events.data;
        while (gh.hasNextPage(events)) {
            events = await gh.getNextPage(events);
            returner = returner.concat(events.data);
        }
        return returner;
    }

    async listPullRequests({ user, repo, state, owner }, gh) {
        const getAll = promisify(gh.pullRequests.getAll, gh);
        let requests = await getAll({ owner, repo, state });
        let returner = requests.data;
        while (gh.hasNextPage(requests)) {
            requests = await gh.getNextPage(requests);
            returner = returner.concat(requests.data);
        }
        return returner;
    }

    async listRepos(config, gh) {
        const getAll = promisify(gh.repos.getAll, gh);
        let repos = await getAll();
        let returner = repos.data;
        while (gh.hasNextPage(repos)) {
            repos = await gh.getNextPage(repos);
            returner = returner.concat(repos.data);
        }
        return returner;
    }

    async listMergedPullRequests({ user, repo, state }, gh) {
        const mergedPRs = [];
        const getAll = promisify(gh.pullRequests.getAll, gh);
        const requests = await getAll({ user, repo, state });
        for (let i = 0; i < requests.length; i += 1) {
            if (requests[i].merged_at) {
                mergedPRs.push(requests[i]);
            }
        }
        return mergedPRs.data;
    }

    async listReposForUser({ user }, gh) {
        const getForUser = promisify(gh.repos.getForUser, gh);
        let repos = await getForUser({ user });
        let returner = repos.data;
        while (gh.hasNextPage(repos)) {
            repos = await gh.getNextPage(repos);
            returner = returner.concat(repos.data);
        }
        return returner;
    }

    async listOrgRepos({ org }, gh) {
        const getForOrg = promisify(gh.repos.getForOrg, gh);
        let repos = await getForOrg({ org });
        let returner = repos.data;
        while (gh.hasNextPage(repos)) {
            repos = await gh.getNextPage(repos);
            returner = returner.concat(repos.data);
        }
        return returner;
    }

    async listRepoCommitComments({ user, repo, owner }, gh) {
        const getAllCommitComments = promisify(gh.repos.getAllCommitComments, gh);
        let comments = await getAllCommitComments({ owner, repo });
        let returner = comments.data;
        while (gh.hasNextPage(comments)) {
            comments = await gh.getNextPage(comments);
            returner = returner.concat(comments.data);
        }
        return returner;
    }

    async listRepoCommits({ user, repo, owner }, gh) {
        const getCommits = promisify(gh.repos.getCommits, gh);
        let commits = await getCommits({ owner, repo });
        let returner = commits.data;
        while (gh.hasNextPage(commits)) {
            commits = await gh.getNextPage(commits);
            returner = returner.concat(commits.data);
        }
        return returner;
    }

    async listCollaborators({ user, repo, owner }, gh) {
        const getCollaborators = promisify(gh.repos.getCollaborators, gh);
        let collabs = await getCollaborators({ owner, repo });
        let returner = collabs.data;
        while (gh.hasNextPage(collabs)) {
            collabs = await gh.getNextPage(collabs);
            returner = returner.concat(collabs.data);
        }
        return returner;
    }

    async getAllUser(config, gh) {
        const { user, method } = config;
        const promises = [];
        const repos = await this.listRepos({ user }, gh);
        repos.data.forEach((repo) => {
            const promise = this[method]({ user, repo: repo.name }, gh);
            promises.push(promise);
        });
        const result = await Promise.all(promises);
        const data = flattenDeep(result); // concat array of arrays into single array
        return data;
    }

    async getAllOrg(config, gh) {
        const { user, org, method, owner } = config;
        const promises = [];
        const repos = await this.listOrgRepos({ org }, gh);
        for (let j = 0; j < repos.length; j += 1) {
            const repo = repos[j];
            if (repo.size === 0) {
                // do nothing
            } else {
                const resp = await this[method]({ user, repo: repo.name, owner }, gh);
                for (let i = 0; i < resp.length; i += 1) {
                    if (resp[i] !== undefined || resp[i] !== null) promises.push(resp[i]);
                }
            }
        }
        return promises;
    }
}
