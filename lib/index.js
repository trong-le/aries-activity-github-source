import { Activity, singleS3StreamOutput } from 'aries-data';
import Github from 'github';

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

    listIssues({ user, repo }, gh) {
        return new Promise((resolve, reject) => {
            gh.issues.getForRepo({ user, repo}, (err, issues) => {
                if (err) return reject(err);
                resolve(issues);
            });
        });
    }

    listAssignees({ user, repo }, gh) {
        return new Promise((resolve, reject) => {
            gh.issues.getAssignees({ user, repo}, (err, assignees) => {
                if (err) return reject(err);
                resolve(assignees);
            });
        });
    }

    listIssueComments({ user, repo }, gh) {
        return new Promise((resolve, reject) => {
            gh.issues.getComments({ user, repo}, (err, comments) => {
                if (err) return reject(err);
                resolve(comments);
            });
        });
    }

    listRepoComments({ user, repo }, gh) {
        return new Promise((resolve, reject) => {
            gh.issues.getCommentsForRepo({ user, repo}, (err, comments) => {
                if (err) return reject(err);
                resolve(comments);
            });
        });
    }

    listIssueEvents({ user, repo, issueNum }, gh) {
        return new Promise((resolve, reject) => {
            gh.issues.getEventsTimeline({ user, repo, number: issueNum }, (err, events) => {
                if (err) return reject(err);
                resolve(events);
            });
        });
    }

    listRepoEvents({ user, repo }, gh) {
        return new Promise((resolve, reject) => {
            gh.issues.getEventsForRepo({ user, repo}, (err, events) => {
                if (err) return reject(err);
                resolve(events);
            });
        });
    }

    listPullRequests({ user, repo, state }, gh) {
        return new Promise((resolve, reject) => {
            gh.pullRequests.getAll({ user, repo, state } , (err, requests) => {
                if (err) return reject(err);
                resolve(requests);
            });
        });
    }

    listRepos({}, gh) {
        return new Promise((resolve, reject) => {
            gh.repos.getAll({ } , (err, repos) => {
                if (err) return reject(err);
                resolve(repos);
            });
        });
    }

    listMergedPullRequests({ user, repo, state }, gh) {
        let mergedPRs = [];
        return new Promise((resolve, reject) => {
            gh.pullRequests.getAll({ user, repo, state } , (err, requests) => {
                if (err) return reject(err);
                for (let req of requests) {
                    if (req.merged_at) {
                        mergedPRs.push(req);
                    }
                }
                resolve(mergedPRs);
            });
        });
    }

    listRepos({ user }, gh) {
        return new Promise((resolve, reject) => {
            gh.repos.getForUser({ user } , (err, repos) => {
                if (err) return reject(err);
                resolve(repos);
            });
        });
    }

    listOrgRepos({ org }, gh) {
        return new Promise((resolve, reject) => {
            gh.repos.getForOrg({ org } , (err, repos) => {
                if (err) return reject(err);
                resolve(repos);
            });
        });
    }

    listRepoCommitComments({ user, repo }, gh) {
        return new Promise((resolve, reject) => {
            gh.repos.getAllCommitComments({ user, repo } , (err, comments) => {
                if (err) return reject(err);
                resolve(comments);
            });
        });
    }

    listRepoCommits({ user, repo }, gh) {
        return new Promise((resolve, reject) => {
            gh.repos.getCommits({ user, repo } , (err, commits) => {
                if (err) return reject(err);
                resolve(commits);
            });
        });
    }

    listCollaborators({ user, repo }, gh) {
        return new Promise((resolve, reject) => {
            gh.repos.getCollaborators({ user, repo } , (err, collabs) => {
                if (err) return reject(err);
                resolve(collabs);
            });
        });
    }
};