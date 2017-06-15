import { Activity, singleS3StreamOutput } from 'aries-data';
import Github from 'github';
import promisify from 'es6-promisify';
import flattenDeep from 'lodash.flattendeep';

export default class GithubSource extends Activity {

    @singleS3StreamOutput('json')
    async onTask(activityTask, config) {
        let data = null;
        
        let client = null;
        
        client = this.authenticatedClient(config);
        

        if (config.repo === 'allUser') return await this.getAllUser(config, client);
        if (config.repo === 'allOrg') return await this.getAllOrg(config, client);
        if (typeof this[config.method] === 'function') {
            data = await this[config.method](config, client);
        }

        return data;
    }

    authenticatedClient({ token }) {
        const client = new Github({
            debug: false,
        });
        client.authenticate({
            type: "token",
            token
        });
        return client;
    }

    /**
      * @param user String username or org name
      */
    async listIssues({ user, repo }, gh) {
        const getForRepo = promisify(gh.issues.getForRepo, gh);
        const issues = await getForRepo({ user, repo });
        return issues;
    }

    async listAssignees({ user, repo }, gh) {
        const getAssignees = promisify(gh.issues.getAssignees, gh);
        const assignees = await getAssignees({ user, repo });
        return assignees;
    }

    async listIssueComments({ user, repo, number }, gh) {
        const getComments = promisify(gh.issues.getComments, gh);
        const comments = await getComments({ user, repo, number });
        return comments;
    }

    async listRepoComments({ user, repo }, gh) {
        const getCommentsForRepo = promisify(gh.issues.getCommentsForRepo, gh);
        const comments = await getCommentsForRepo({ user, repo });
        return comments;
    }

    async listIssueEvents({ user, repo, number }, gh) {
        const getEventsTimeline = promisify(gh.issues.getEventsTimeline, gh);
        const events = await getEventsTimeline({ user, repo, number });
        return events;
    }

    async listRepoEvents({ user, repo }, gh) {
        const getEventsForRepo = promisify(gh.issues.getEventsForRepo, gh);
        const events = await getEventsForRepo({ user, repo });
        return events;
    }

    async listPullRequests({ user, repo, state }, gh) {
        const getAll = promisify(gh.pullRequests.getAll, gh);
        const requests = await getAll({ user, repo, state });
        return requests;
    }

    async listRepos(config, gh) {
        const getAll = promisify(gh.repos.getAll, gh);
        const repos = await getAll();
        return repos;
    }

    async listMergedPullRequests({ user, repo, state }, gh) {
        const mergedPRs = [];
        const getAll = promisify(gh.pullRequests.getAll, gh);
        const requests = await getAll({ user, repo, state });
        for (let i = 0; i < requests.length; i++) {
            if(requests[i].merged_at) {
                mergedPRs.push(requests[i]);
            }
        }
        return mergedPRs;
    }

    async listReposForUser({ user }, gh) {
        const getForUser = promisify(gh.repos.getForUser, gh);
        const repos = await getForUser({ user });
        return repos;
    }

    async listOrgRepos({ org }, gh) {
        const getForOrg = promisify(gh.repos.getForOrg, gh);
        const repos = await getForOrg({ org });
        return repos;
    }

    async listRepoCommitComments({ user, repo }, gh) {
        const getAllCommitComments = promisify(gh.repos.getAllCommitComments, gh);
        const comments = await getAllCommitComments({ user, repo });
        return comments;
    }

    async listRepoCommits({ user, repo }, gh) {
        const getCommits = promisify(gh.repos.getCommits, gh);
        const commits = await getCommits({ user, repo });
        return commits;
    }

    async listCollaborators({ user, repo }, gh) {
        const getCollaborators = promisify(gh.repos.getCollaborators, gh);
        const collabs = await getCollaborators({ user, repo });
        return collabs;
    }

    async getAllUser(config, gh) {
        const { user, method } = config;
        const promises = [];
        const repos = await this.listRepos({ user }, gh);
        repos.forEach((repo) => {
            const promise = this[method](user, repo.name, gh);
            promises.push(promise);
        });
        const result = await Promise.all(promises);
        const data = flattenDeep(result); // concat array of arrays into single array
        return data;
    }

    async getAllOrg(config, gh) {
        const { org, method } = config;
        const promises = [];
        const repos = await this.listOrgRepos({ org }, gh);
        repos.forEach((repo) => {
            const promise = this[method](org, repo.name, gh);
            promises.push(promise);
        });
        const result = await Promise.all(promises);
        const data = flattenDeep(result); // concat array of arrays into single array
        this.log.debug(data);
        return data;
    }
}
