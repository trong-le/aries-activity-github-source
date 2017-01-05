import { Activity, singleS3StreamOutput } from 'aries-data';
import Github from 'github';
import promisify from 'es6-promisify';

export default class GithubSource extends Activity {
    static props = {
        name: require('../package.json').name, 
        version: require('../package.json').version
    };

    @singleS3StreamOutput('json')
    async onTask(activityTask, config) {
        let data = null;
        const client = this.authenticatedClient(config);
        if (typeof this[config.method] === 'function') {
            data = await this[config.method](config, client);
        }

        return data;
    }

    authenticatedClient({ user, token }) {
        const client = new Github({
            debug: true
        });
        client.authenticate({
            type: 'oauth',
            token: token
        });
        return client;
    }

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

    async listIssueComments({ user, repo }, gh) {
        const getComments = promisify(gh.issues.getComments, gh);
        const comments = await getComments({ user, repo });
        return comments;
    }

    async listRepoComments({ user, repo }, gh) {
        const getCommentsForRepo = promisify(gh.issues.getCommentsForRepo, gh);
        const comments = await getCommentsForRepo({ user, repo });
        return comments;
    }

    async listIssueEvents({ user, repo, issueNum }, gh) {
        const getEventsTimeline = promisify(gh.issues.getEventsTimeline, gh);
        const events = await getEventsTimeline({ user, repo, number: issueNum });
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

    async listRepos({}, gh) {
        const getAll = promisify(gh.repos.getAll, gh);
        const repos = await getAll({});
        return repos;
    }

    async listMergedPullRequests({ user, repo, state }, gh) {
        let mergedPRs = [];
        const getAll = promisify(gh.pullRequests.getAll, gh);
        const requests = await getAll({ user, repo, state });
        for (let req of requests) {
            if (req.merged_at) {
                mergedPRs.push(req);
            }
        }
        return mergedPRs
    }

    async listRepos({ user }, gh) {
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
        const comments = await getForOrg({ user, repo });
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
};