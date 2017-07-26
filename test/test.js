import { assert } from 'chai';
import Github from 'github';
import nock from 'nock';
import GithubSource from '../lib/index';
import config from './test-config';
import * as fixtures from './fixtures';

const URL = 'https://api.github.com';

function unauthenticatedClient() {
    return new Github({
        debug: false,
    });
}

describe('GithubSource', () => {
    describe('listOrgMembers', () => {
        before(() => {
            nock(URL)
            .get(`/orgs/${config.org}/members`)
            .reply('200', fixtures.orgMembers);
        });

        it('authenticates the client and gets all org members', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listOrgMembers(config, client);
            assert.isOk(data);
        });
    });

    describe('listIssues', () => {
        beforeEach(() => {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/issues`)
            .query(true)
            .reply('200', fixtures.issues);
        });

        it('authenticates the client and gets all issues', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const cleanedConfig = source.getSinceUntil(config);
            const data = await source.listIssues(cleanedConfig, client);
            assert.isOk(data);
        });

        it('adds the repoName field if appendRepo is true', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const cleanedConfig = source.getSinceUntil(config);
            cleanedConfig.appendRepo = true;
            const data = await source.listIssues(cleanedConfig, client);

            assert.isOk(data);
            assert.equal(data[0].repoName, 'allOrg');
        });
    });

    describe('listAvailableAssignees', () => {
        before(() => {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/assignees`)
            .reply('200', fixtures.response);
        });

        it('authenticates the client and gets all assignees', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listAvailableAssignees(config, client);
            assert.isOk(data);
        });
    });

    describe('listIssueComments', () => {
        before(() => {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/issues/${config.number}/comments`)
            .reply('200', fixtures.response);
        });

        it('authenticates the client and gets all issue comments', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listIssueComments(config, client);
            assert.isOk(data);
        });
    });

    describe('listRepoComments', () => {
        before(() => {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/issues/comments`)
            .query(true)
            .reply('200', fixtures.response);
        });

        it('authenticates the client and gets all repo comments', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listRepoComments(config, client);
            assert.isOk(data);
        });
    });

    describe('listIssueEvents', () => {
        before(() => {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/issues/${config.number}/timeline`)
            .reply('200', fixtures.response);
        });

        it('authenticates the client and gets all issue events', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listIssueEvents(config, client);
            assert.isOk(data);
        });
    });

    describe('listRepoEvents', () => {
        before(() => {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/issues/events`)
            .reply('200', fixtures.response);
        });

        it('authenticates the client and gets all repo events', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listRepoEvents(config, client);
            assert.isOk(data);
        });
    });

    describe('listPullRequests', () => {
        before(() => {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/pulls`)
            .query(true)
            .reply('200', fixtures.response);
        });

        it('authenticates the client and gets all pull requests', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listPullRequests(config, client);
            assert.isOk(data);
        });
    });

    describe('listRepos', () => {
        before(() => {
            nock(URL)
            .get('/user/repos')
            .reply('200', fixtures.response);
        });

        it('authenticates the client and gets all repos', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listRepos(config, client);
            assert.isOk(data);
        });
    });

    describe('listMergedPullRequests', () => {
        before(() => {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/pulls`)
            .query(true)
            .reply('200', fixtures.response);
        });

        it('authenticates the client and gets all merged pull requests', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listMergedPullRequests(config, client);
            assert.isOk(data);
        });
    });

    describe('listReposForUser', () => {
        before(() => {
            nock(URL)
            .get(`/users/${config.user}/repos`)
            .reply('200', fixtures.response);
        });

        it('authenticates the client and gets all repos for user', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listReposForUser(config, client);
            assert.isOk(data);
        });
    });

    describe('listOrgRepos', () => {
        before(() => {
            nock(URL)
            .get(`/orgs/${config.org}/repos`)
            .reply('200', fixtures.response);
        });

        it('authenticates the client and gets all repos for org', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listOrgRepos(config, client);
            assert.isOk(data);
        });
    });

    describe('listRepoCommitComments', () => {
        before(() => {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/comments`)
            .reply('200', fixtures.response);
        });

        it('authenticates the client and gets all repo commit comments', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listRepoCommitComments(config, client);
            assert.isOk(data);
        });
    });

    describe('listRepoCommits', () => {
        before(() => {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/commits`)
            .query(true)
            .reply('200', fixtures.response);
        });

        it('authenticates the client and gets all repo commits', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listRepoCommits(config, client);
            assert.isOk(data);
        });
    });

    describe('listCollaborators', () => {
        before(() => {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/collaborators`)
            .reply('200', fixtures.response);
        });

        it('authenticates the client and gets all collaborators', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listCollaborators(config, client);
            assert.isOk(data);
        });
    });

    describe('getAllUser', () => {
        before(() => {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/issues`)
            .query(true)
            .reply('200', fixtures.response);

            nock(URL)
            .get('/user/repos')
            .reply('200', fixtures.response);
        });

        it('authenticates the client and gets all orgs', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listIssues(config, client);
            assert.isOk(data);
        });
    });
});
