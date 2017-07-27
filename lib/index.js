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

        if (config.repo === 'allUser') {
            data = await this.getAllUser(cleanedConfig, client);
        } else if (config.repo === 'allOrg') {
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

        let until = moment().format();
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

    async listAvailableAssignees({ repo, owner, appendRepo = false }, gh) {
        const getAssignees = promisify(gh.issues.getAssignees, gh);
        const assignees = await getAssignees({ owner, repo });
        const data = await this.paginate(assignees, gh);

        if (appendRepo) {
            data.forEach(item => Object.assign(item, { repoName: repo }));
        }

        return data;
    }

    async listCollaborators({ repo, owner, appendRepo = false }, gh) {
        const getCollaborators = promisify(gh.repos.getCollaborators, gh);
        const collabs = await getCollaborators({ repo, owner });
        const data = await this.paginate(collabs, gh);

        if (appendRepo) {
            data.forEach(item => Object.assign(item, { repoName: repo }));
        }

        return data;
    }

    async listIssues({ repo, owner, since, state = 'open', appendRepo = false }, gh) {
        const getForRepo = promisify(gh.issues.getForRepo, gh);
        const issues = await getForRepo({ owner, repo, since, state });
        const data = await this.paginate(issues, gh);

        if (appendRepo) {
            data.forEach(item => Object.assign(item, { repoName: repo }));
        }

        return data;
    }

    async listIssueComments({ repo, number, owner, since, appendRepo = false }, gh) {
        const getComments = promisify(gh.issues.getComments, gh);
        const comments = await getComments({ repo, number, owner, since });
        const data = await this.paginate(comments, gh);

        if (appendRepo) {
            data.forEach(item => Object.assign(item, { repoName: repo }));
        }

        return data;
    }

    async listIssueEvents({ user, repo, number, owner, appendRepo = false }, gh) {
        const getEventsTimeline = promisify(gh.issues.getEventsTimeline, gh);
        const events = await getEventsTimeline({ user, repo, issue_number: number, owner });
        const data = await this.paginate(events, gh);

        if (appendRepo) {
            data.forEach(item => Object.assign(item, { repoName: repo }));
        }

        return data;
    }

    async listMergedPullRequests({ user, repo, owner, state = 'all', appendRepo = false }, gh) {
        let mergedPRs = [];
        const response = await gh.pullRequests.getAll({ user, repo, owner, state });
        const requests = response.data;
        if (requests && requests[0]) {
            mergedPRs = requests.map((request) => {
                if (request.merged_at) {
                    return request;
                }
            });
        }

        mergedPRs = remove(mergedPRs, undefined);

        if (appendRepo) {
            mergedPRs.forEach(item => Object.assign(item, { repoName: repo }));
        }

        return mergedPRs;
    }

    async listOrgMembers({ org }, gh) {
        const getMembers = promisify(gh.orgs.getMembers, gh);
        const members = await getMembers({ org });
        return this.paginate(members, gh);
    }

    async listOrgRepos({ org }, gh) {
        const getForOrg = promisify(gh.repos.getForOrg, gh);
        const repos = await getForOrg({ org });
        return this.paginate(repos, gh);
    }

    async listPullRequests({ repo, owner, state = 'open', appendRepo = false }, gh) {
        const getAll = promisify(gh.pullRequests.getAll, gh);
        const requests = await getAll({ owner, repo, state });
        const data = await this.paginate(requests, gh);

        if (appendRepo) {
            data.forEach(item => Object.assign(item, { repoName: repo }));
        }

        return data;
    }

    async listRepos(config, gh) {
        const getAll = promisify(gh.repos.getAll, gh);
        const repos = await getAll();
        return this.paginate(repos, gh);
    }

    async listRepoComments({ repo, owner, since, appendRepo = false }, gh) {
        const getCommentsForRepo = promisify(gh.issues.getCommentsForRepo, gh);
        const comments = await getCommentsForRepo({ owner, repo, since });
        const data = await this.paginate(comments, gh);

        if (appendRepo) {
            data.forEach(item => Object.assign(item, { repoName: repo }));
        }

        return data;
    }

    async listRepoCommitComments({ repo, owner, appendRepo = false }, gh) {
        const getAllCommitComments = promisify(gh.repos.getAllCommitComments, gh);
        const comments = await getAllCommitComments({ owner, repo });
        const data = await this.paginate(comments, gh);

        if (appendRepo) {
            data.forEach(item => Object.assign(item, { repoName: repo }));
        }

        return data;
    }

    async listRepoCommits({ repo, owner, since, until, appendRepo = false }, gh) {
        const getCommits = promisify(gh.repos.getCommits, gh);
        const commits = await getCommits({ owner, repo, since, until });
        const data = await this.paginate(commits, gh);

        if (appendRepo) {
            data.forEach(item => Object.assign(item, { repoName: repo }));
        }

        return data;
    }

    async listRepoEvents({ user, repo, owner, appendRepo = false }, gh) {
        const getEventsForRepo = promisify(gh.issues.getEventsForRepo, gh);
        const events = await getEventsForRepo({ user, repo, owner });
        const data = await this.paginate(events, gh);

        if (appendRepo) {
            data.forEach(item => Object.assign(item, { repoName: repo }));
        }

        return data;
    }

    async listReposForUser({ user }, gh) {
        const getForUser = promisify(gh.repos.getForUser, gh);
        const repos = await getForUser({ username: user });
        return this.paginate(repos, gh);
    }


    async getAllUser(config, gh) {
        const { user, method } = config;
        const results = [];
        const repos = await this.listRepos({ user }, gh);

        for (const repo of repos) {
            if (repo.size !== 0) {
                const resp = await this[method]({ ...config, repo: repo.name }, gh);
                for (const obj of resp) {
                    if (obj !== undefined || obj !== null) results.push(obj);
                }
            }
        }

        return remove(results, undefined);
    }

    async getAllOrg(config, gh) {
        const { org, method } = config;
        const results = [];
        const repos = await this.listOrgRepos({ org }, gh);

        for (const repo of repos) {
            if (repo.size !== 0) {
                const resp = await this[method]({ ...config, repo: repo.name }, gh);
                for (const obj of resp) {
                    if (obj !== undefined || obj !== null) results.push(obj);
                }
            }
        }

        return remove(results, undefined);
    }
}
