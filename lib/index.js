import { Activity, singleS3StreamOutput } from 'aries-data';
import Github from 'github';
import thenify from 'thenify';

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
        const getForRepo = thenify(gh.issues.getForRepo);
        const issues = await getForRepo({ user, repo });
        return issues;
    }

    async listAssignees({ user, repo }, gh) {
        const getAssignees = thenify(gh.issues.getAssignees);
        const assignees = await getAssignees({ user, repo });
        return assignees;
    }

    async listIssueComments({ user, repo }, gh) {
        const getComments = thenify(gh.issues.getComments);
        const comments = await getComments({ user, repo });
        return comments;
    }

    async listRepoComments({ user, repo }, gh) {
        const getCommentsForRepo = thenify(gh.issues.getCommentsForRepo);
        const comments = await getCommentsForRepo({ user, repo });
        return comments;
    }

    async listIssueEvents({ user, repo, issueNum }, gh) {
        const getEventsTimeline = thenify(gh.issues.getEventsTimeline);
        const events = await getEventsTimeline({ user, repo, number: issueNum });
        return events;
    }

    async listRepoEvents({ user, repo }, gh) {
        const getEventsForRepo = thenify(gh.issues.getEventsForRepo);
        const events = await getEventsForRepo({ user, repo });
        return events;
    }

    async listPullRequests({ user, repo, state }, gh) {
        const getAll = thenify(gh.pullRequests.getAll);
        const requests = await getAll({ user, repo, state });
        return requests;
    }

    async listRepos({}, gh) {
        const getAll = thenify(gh.repos.getAll);
        const repos = await getAll({});
        return repos;
    }

    async listMergedPullRequests({ user, repo, state }, gh) {
        let mergedPRs = [];
        const getAll = thenify(gh.pullRequests.getAll);
        const requests = await getAll({ user, repo, state });
        for (let req of requests) {
            if (req.merged_at) {
                mergedPRs.push(req);
            }
        }
        return mergedPRs
    }

    async listRepos({ user }, gh) {
        const getForUser = thenify(gh.repos.getForUser);
        const repos = await getForUser({ user });
        return repos;
    }

    async listOrgRepos({ org }, gh) {
        const getForOrg = thenify(gh.repos.getForOrg);
        const repos = await getForOrg({ org });
        return repos;
    }

    async listRepoCommitComments({ user, repo }, gh) {
        const getAllCommitComments = thenify(gh.repos.getAllCommitComments);
        const comments = await getForOrg({ user, repo });
        return comments;
    }

    async listRepoCommits({ user, repo }, gh) {
        const getCommits = thenify(gh.repos.getCommits);
        const commits = await getCommits({ user, repo });
        return commits;
    }

    async listCollaborators({ user, repo }, gh) {
        const getCollaborators = thenify(gh.repos.getCollaborators);
        const collabs = await getCollaborators({ user, repo });
        return collabs;
    }
};