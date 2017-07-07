import { Activity, singleS3StreamOutput } from 'aries-data';
import Github from 'github';
import promisify from 'es6-promisify';
import remove from 'lodash.remove';
import moment from 'moment';

export default class GithubSource extends Activity {

    @singleS3StreamOutput('json')
    async onTask(activityTask, config, executionDate) {
        let data = null;
        const client = await this.authenticatedClient(config);
        const cleanedConfig = this.getSinceUntil(config, executionDate);

        if (config.repo === 'allUser') return this.getAllUser(cleanedConfig, client);
        if (config.repo === 'allOrg') {
            data = await this.getAllOrg(cleanedConfig, client);
        } else if (typeof this[config.method] === 'function') {
            data = await this[config.method](cleanedConfig, client);
        }
        return data;
    }

    getSinceUntil(config, executionDate) {
        let since = '2004-01-01T00:00:00.000Z';
        if (config.since === 'lastRun') {
            since = executionDate;
        } else if (config.since) {
            since = config.since;
        }

        let until = moment.format();
        if (config.until === 'lastRun') {
            until = executionDate;
        } else if (config.since) {
            until = config.until;
        }
        return { ...config, since, until };
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

    async paginate(obj, gh) {
        let temp = obj;
        let returner = temp.data;
        while (gh.hasNextPage(temp)) {
            temp = await gh.getNextPage(temp);
            returner = returner.concat(temp.data);
        }
        return returner;
    }

    /**
      * @param user String username or org name
      */
    async listIssues({ user, repo, owner, since }, gh) {
        const getForRepo = promisify(gh.issues.getForRepo, gh);
        const issues = await getForRepo({ owner, repo });
        return this.paginate(issues, gh);
    }

    async listAvailableAssignees({ repo, owner }, gh) {
        const getAssignees = promisify(gh.issues.getAssignees, gh);
        const assignees = await getAssignees({ owner, repo });
        return this.paginate(assignees, gh);
    }

    async listIssueComments({ user, repo, number, owner, since }, gh) {
        const getComments = promisify(gh.issues.getComments, gh);
        const comments = await getComments({ repo, number, owner });
        return this.paginate(comments, gh);
    }

    async listRepoComments({ user, repo, owner, since }, gh) {
        const getCommentsForRepo = promisify(gh.issues.getCommentsForRepo, gh);
        const comments = await getCommentsForRepo({ owner, repo });
        return this.paginate(comments, gh);
    }

    async listIssueEvents({ user, repo, number, owner }, gh) {
        const getEventsTimeline = promisify(gh.issues.getEventsTimeline, gh);
        const events = await getEventsTimeline({ user, repo, issue_number: number, owner });
        return this.paginate(events, gh);
    }

    async listRepoEvents({ user, repo, owner }, gh) {
        const getEventsForRepo = promisify(gh.issues.getEventsForRepo, gh);
        const events = await getEventsForRepo({ user, repo, owner });
        return this.paginate(events, gh);
    }

    async listPullRequests({ repo, owner }, gh) {
        const getAll = promisify(gh.pullRequests.getAll, gh);
        const requests = await getAll({ owner, repo, state });
        return this.paginate(requests, gh);
    }

    async listRepos(config, gh) {
        const getAll = promisify(gh.repos.getAll, gh);
        const repos = await getAll();
        return this.paginate(repos, gh);
    }

    async listMergedPullRequests({ user, repo, owner,state }, gh) {
        let mergedPRs = [];
        const requests = await gh.pullRequests.getAll({ user, repo, owner,state });
        if (requests && requests[0]) {
            mergedPRs = requests.map((request) => {
                if (request.merged_at) {
                    return request;
                }
            });
        }
        return remove(mergedPRs, undefined);
    }

    async listReposForUser({ user }, gh) {
        const getForUser = promisify(gh.repos.getForUser, gh);
        const repos = await getForUser({ username: user });
        return this.paginate(repos, gh);
    }

    async listOrgRepos({ org }, gh) {
        const getForOrg = promisify(gh.repos.getForOrg, gh);
        const repos = await getForOrg({ org });
        return this.paginate(repos, gh);
    }

    async listRepoCommitComments({ repo, owner }, gh) {
        const getAllCommitComments = promisify(gh.repos.getAllCommitComments, gh);
        const comments = await getAllCommitComments({ owner, repo });
        return this.paginate(comments, gh);
    }

    async listRepoCommits({ user, repo, owner, since, until }, gh) {
        const getCommits = promisify(gh.repos.getCommits, gh);
        const commits = await getCommits({ owner, repo, since, until });
        return this.paginate(commits, gh);
    }

    async listCollaborators({ repo, owner }, gh) {
        const getCollaborators = promisify(gh.repos.getCollaborators, gh);
        const collabs = await getCollaborators({ owner, repo });
        return this.paginate(collabs, gh);
    }

    async getAllUser(config, gh, owner) {
        const { user, method } = config;
        let promises = [];
        const repos = await this.listRepos({ user }, gh);
        for (const repo of repos) {
            if (repo.size !== 0) {
                const resp = await this[method]({ user, repo: repo.name, owner }, gh);
                promises = resp.map((obj) => {
                    if (obj !== undefined || obj !== null) return obj;
                });
            }
        }
        return remove(promises, undefined);
    }

    async getAllOrg(config, gh) {
        const { user, org, method, owner, since, until } = config;
        const promises = [];
        const repos = await this.listOrgRepos({ org }, gh);
        for (const repo of repos) {
            if (repo.size !== 0) {
                const resp = await this[method]({ user, repo: repo.name, owner, since, until }, gh);
                for (const obj of resp) {
                    if (obj !== undefined || obj !== null) promises.push(obj);
                }
            }
        }
        return remove(promises, undefined);
    }
}
