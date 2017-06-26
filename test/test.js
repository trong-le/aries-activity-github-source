import {assert} from 'chai';
import GithubSource from '../lib/index.js';
import Github from 'github';
import config from './test-config';
import nock from 'nock';
import * as fixtures from './fixtures';

const URL = 'https://api.github.com';

function unauthenticatedClient() {
    return new Github({
        debug: false,
    });
}

describe('GithubSource', () => {

    describe('listIssues', () => {
    	before(function() {
    		nock(URL)
    		.get(`/repos/${config.org}/${config.repo}/issues`)
    		.reply('200', fixtures.response);
    	});
    	it ('authenticates the client and gets all issues', async () => {
	        const source = new GithubSource();
	        const client = unauthenticatedClient(config);
	        const data = await source.listIssues(config, client);
	        assert.isOk(data);
	    });
    });

    describe('listAssignees', () => {
        before(function() {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/assignees`)
            .reply('200', fixtures.response);
        });
        it ('authenticates the client and gets all assignees', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listAssignees(config, client);
            assert.isOk(data);
        });
    });

    describe('listIssueComments', () => {
        before(function() {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/issues/${config.number}/comments`)
            .reply('200', fixtures.response);
        });
        it ('authenticates the client and gets all issue comments', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listIssueComments(config, client);
            assert.isOk(data);
        });
    });

    describe('listRepoComments', () => {
        before(function() {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/issues/comments`)
            .reply('200', fixtures.response);
        });
        it ('authenticates the client and gets all repo comments', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listRepoComments(config, client);
            assert.isOk(data);
        });
    });

    describe('listIssueEvents', () => {
        before(function() {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/issues/${config.number}/timeline`)
            .reply('200', fixtures.response);
        });
        it ('authenticates the client and gets all issue events', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listIssueEvents(config, client);
            assert.isOk(data);
        });
    });

    describe('listRepoEvents', () => {
        before(function() {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/issues/events`)
            .reply('200', fixtures.response);
        });
        it ('authenticates the client and gets all repo events', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listRepoEvents(config, client);
            assert.isOk(data);
        });
    });

    describe('listPullRequests', () => {
        before(function() {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/pulls?state=undefined`)
            .reply('200', fixtures.response);;
        });
        it ('authenticates the client and gets all pull requests', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listPullRequests(config, client);
            assert.isOk(data);
        });
    });

    describe('listRepos', () => {
        before(function() {
            nock(URL)
            .get(`/user/repos`)
            .reply('200', fixtures.response);
        });
        it ('authenticates the client and gets all repos', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listRepos(config, client);
            assert.isOk(data);
        });
    });

    describe('listMergedPullRequests', () => {
        before(function() {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/pulls?state=undefined`)
            .reply('200', fixtures.response);
        });
        it ('authenticates the client and gets all merged pull requests', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listMergedPullRequests(config, client);
            assert.isOk(data);
        });
    });

    describe('listReposForUser', () => {
        before(function() {
            nock(URL)
            .get(`/users/${config.user}/repos`)
            .reply('200', fixtures.response);
        });
        it ('authenticates the client and gets all repos for user', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listReposForUser(config, client);
            assert.isOk(data);
        });
    });

    describe('listOrgRepos', () => {
        before(function() {
            nock(URL)
            .get(`/orgs/${config.org}/repos`)
            .reply('200', fixtures.response);
        });
        it ('authenticates the client and gets all repos for org', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listOrgRepos(config, client);
            assert.isOk(data);
        });
    });

    describe('listRepoCommitComments', () => {
        before(function() {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/comments`)
            .reply('200', fixtures.response);
        });
        it ('authenticates the client and gets all repo commit comments', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listRepoCommitComments(config, client);
            assert.isOk(data);
        });
    });

    describe('listRepoCommits', () => {
        before(function() {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/commits`)
            .reply('200', fixtures.response);
        });
        it ('authenticates the client and gets all repo commits', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listRepoCommits(config, client);
            assert.isOk(data);
        });
    });

    describe('listCollaborators', () => {
        before(function() {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/collaborators`)
            .reply('200', fixtures.response);
        });
        it ('authenticates the client and gets all collaborators', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listCollaborators(config, client);
            assert.isOk(data);
        });
    });

    describe('getAllUser', () => {
        before(function() {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/issues`)
            .reply('200', fixtures.response);

            nock(URL)
            .get(`/user/repos`)
            .reply('200', fixtures.response);
        });
        it ('authenticates the client and gets all orgs', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listIssues(config, client);
            assert.isOk(data);
        });
    });

    describe('listIssues', () => {
        before(function() {
            nock(URL)
            .get(`/repos/${config.org}/${config.repo}/issues`)
            .reply('200', fixtures.response);

            nock(URL)
            .get(`/orgs/${config.org}/repos`)
            .reply('200', fixtures.response);
        });
        it ('authenticates the client and gets all orgs', async () => {
            const source = new GithubSource();
            const client = unauthenticatedClient(config);
            const data = await source.listIssues(config, client);
            assert.isOk(data);
        });
    });
});
