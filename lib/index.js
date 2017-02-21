import { Activity, singleS3StreamOutput, logger } from 'aries-data';
import flattenDeep from 'lodash.flattendeep';
import Github from 'github';
import promisify from 'es6-promisify';
import fs from 'fs';

export default class GithubSource extends Activity {
    static props = {
        name: require('../package.json').name,
        version: require('../package.json').version,
    };

    @singleS3StreamOutput('json')
    async onTask(activityTask, config) {
        let data = null;
        const client = this.authenticatedClient(config);

        if (config.repo === 'all') return await this.getAll(config, client);
        if (typeof this[config.method] === 'function') {
            data = await this[config.method](config, client);
        }

        return data;
    }

    authenticatedClient({ token }) {
        this.log.debug('authenticatedClient called');
        const client = new Github({
            debug: true,
        });
        client.authenticate({
            type: 'oauth',
            token,
        });
        return client;
    }

    async listIssues({ owner, repo }, gh) {
        const getForRepo = promisify(gh.issues.getForRepo, gh);
        const issues = await getForRepo({ owner, repo });
        return issues;
    }

    async listAssignees({ owner, repo }, gh) {
        const getAssignees = promisify(gh.issues.getAssignees, gh);
        const assignees = await getAssignees({ owner, repo });
        return assignees;
    }

    async listIssueComments({ owner, repo, number }, gh) {
        const getComments = promisify(gh.issues.getComments, gh);
        let data = [];
        if (!number || number === 'all') {
            const issues = await this.listIssues({ owner, repo }, gh);
            issues.forEach(async issue => {
                const comments = await getComments({ owner, repo, number: issue.number });
                data = [...comments, data];
            });
        } else {
            data = await getComments({ owner, repo, number });
        }
        return data;
    }

    async listRepoComments({ owner, repo }, gh) {
        const getCommentsForRepo = promisify(gh.issues.getCommentsForRepo, gh);
        const comments = await getCommentsForRepo({ owner, repo });
        return comments;
    }

    async listIssueEvents({ owner, repo, number }, gh) {
        const getEventsTimeline = promisify(gh.issues.getEventsTimeline, gh);
        let data = [];
        if (!number || number === 'all') {
            const issues = await this.listIssues({ owner, repo }, gh);
            issues.forEach(async issue => {
                const comments = await getEventsTimeline({ owner, repo, issue_number: issue.number });
                data = [...comments, data];
            });
        } else {
            data = await getEventsTimeline({ owner, repo, number });
        }
        return data;
    }

    async listRepoEvents({ owner, repo }, gh) {
        const getEventsForRepo = promisify(gh.issues.getEventsForRepo, gh);
        const events = await getEventsForRepo({ owner, repo });
        return events;
    }

    async listPullRequests({ owner, repo, state }, gh) {
        const getAll = promisify(gh.pullRequests.getAll, gh);
        const requests = await getAll({ owner, repo, state });
        return requests;
    }

    async listMergedPullRequests({ owner, repo, state }, gh) {
        let mergedPRs = [];
        const getAll = promisify(gh.pullRequests.getAll, gh);
        const requests = await getAll({ owner, repo, state });
        for (let req of requests) {
            if (req.merged_at) {
                mergedPRs.push(req);
            }
        }
        return mergedPRs;
    }

    async listRepos({ owner }, gh) {
        const getForUser = promisify(gh.repos.getForUser, gh);
        const repos = await getForUser({ username: owner });
        return repos;
    }

    async listRepoCommitComments({ owner, repo }, gh) {
        const getAllCommitComments = promisify(gh.repos.getAllCommitComments, gh);
        const comments = await getAllCommitComments({ owner, repo });
        return comments;
    }

    async listRepoCommits({ owner, repo }, gh) {
        const getCommits = promisify(gh.repos.getCommits, gh);
        const commits = await getCommits({ owner, repo });
        return commits;
    }

    async listCollaborators({ owner, repo }, gh) {
        const getCollaborators = promisify(gh.repos.getCollaborators, gh);
        const collabs = await getCollaborators({ owner, repo });
        return collabs;
    }

    async getAll(config, gh) {
        const { owner, method } = config;
        const promises = [];
        const repos = await this.listRepos({ owner }, gh);
        repos.forEach(repo => {
            const promise = this[method]({ ...config, repo: repo.name }, gh);
            promises.push(promise);
        });
        const result = await Promise.all(promises);
        const data = flattenDeep(result); // concat array of arrays into single array
        return data;
    }
}
