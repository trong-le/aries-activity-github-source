import { assert } from 'chai';
import GithubSource from '../lib/index.js';
import config from './test-config';
import nock from 'nock';
import * as fixtures from './fixtures';

const URL = 'https://api.github.com';

describe('GithubSource', () => {
    // GET /repos/:owner/:repo/issues
    describe('listIssues()', () => {
      before(function(){
        nock(URL)
        .get('/repos/${user}/${repo}/issues')
        .reply(200, fixtures.issues)
      });

      it('should get a list of issues for a repo', async() => {
        const source = new GithubSource();
        const data = await source.listIssues(config);
        console.log(data);
        assert.ok(data);
      });
    });


//     // GET /repos/:owner/:repo/assignees
//     describe('#getAssignees()', () => {
//       before(function(){
//         nock(URL)
//         .get('/repos/${config.user}/${repo}/assignees')
//         .reply(200, fixtures.assignees)
//         })
//       it('should get a list of assignees'), async() => {
//         const source = new AhaSource();
//         const data = await source.listAssignees(config);
//         console.log(data);
//         assert.ok(data);
//       };
//     });

    // // GET /repos/:owner/:repo/issues/:number/comments
    // describe('#getComments()', () => {
    //   before(function(){
    //     nock(URL)
    //     .get('/repos/${user}/${repo}/issues/${number}/comments')
    //     .reply(200, fixtures.comments)
    //     })
    //   it('should get a list of comments', async() => {
    //     const source = new GithubSource();
    //     const data = await source.listIssueComments(config);
    //     console.log(data);
    //     assert.ok(data);
    //   });
    // });

    // GET /repos/:owner/:repo/issues/comments
    describe('#getRepoComments()', () => {
      before(function(){
        nock(URL)
        .get('/repos/${user}/${repo}/issues/comments')
        .reply(200, fixtures.repoComments)
        })
      it('should get a list of comments in a repo', async() => {
        const source = new GithubSource();
        const data = await source.listRepoComments(config);
        console.log(data);
        assert.ok(data);
      });
    });

//     // GET /repos/:owner/:repo/issues/:issue_number/events
//     describe('#getIssueEvents()', () => {
//       before(function(){
//         nock(URL)
//         .get('/repos/${user}/${repo}/issues/${issueNum}/events')
//         .reply(200, fixtures.issueEvents)
//         })
//       it('should get a list of events in an issue'), async() => {
//         const source = new AhaSource();
//         const data = await source.listIssueEvents(config);
//         console.log(data);
//         assert.ok(data);
//       };
//     });

//     // GET /repos/:owner/:repo/issues/events
//     describe('#getEventsForRepo()', () => {
//       before(function(){
//         nock(URL)
//         .get('/repos/${user}/${repo}/issues/events')
//         .reply(200, fixtures.repoEvents)
//         })
//       it('should get a list of events in issues in a repo'), async() => {
//         const source = new AhaSource();
//         const data = await source.listRepoEvents(config);
//         console.log(data);
//         assert.ok(data);
//       };
//     });

//     // GET /repos/:owner/:repo/pulls
//     describe('#getPullRequests()', () => {
//       before(function(){
//         nock(URL)
//         .get('/repos/${user}/${repo}/pulls')
//         .reply(200, fixtures.pullRequests)
//         })
//       it('should get a list of all pull requests'), async() => {
//         const source = new AhaSource();
//         const data = await source.listRepoEvents(config);
//         console.log(data);
//         assert.ok(data);
//       };
//     });

//     // GET /repos/:owner/:repo/pulls
//     describe('#getMergedPullRequests()', () => {
//       before(function(){
//         nock(URL)
//         .get('/repos/${user}/${repo}/pulls')
//         .reply(200, fixtures.mergedPullRequests)
//         })
//       it('should get a list of all pull requests that have been merged'), async() => {
//         const source = new AhaSource();
//         const data = await source.listRepos(config);
//         console.log(data);
//         assert.ok(data);
//       };
//     });

//     // GET /user/repos
//     describe('#getRepos()', () => {
//       before(function(){
//         nock(URL)
//         .get('/user/repos')
//         .reply(200, fixtures.Repos)
//         })
//       it('should get a list of all repos the authenticated user has access to'), async() => {
//         const source = new AhaSource();
//         const data = await source.listRepos(config);
//         console.log(data);
//         assert.ok(data);
//       };
//     });

//     // GET /users/:username/repos
//     describe('#getUserRepos()', () => {
//       before(function(){
//         nock(URL)
//         .get('/${user}/repos')
//         .reply(200, fixtures.userRepos)
//         })
//       it('should get a list of all public repos for the specified user'), async() => {
//         const source = new AhaSource();
//         const data = await source.listUserRepos(config);
//         console.log(data);
//         assert.ok(data);
//       };
//     });

//     // GET /orgs/:org/repos
//     describe('#getOrgRepos()', () => {
//       before(function(){
//         nock(URL)
//         .get('/orgs/${org}/repos')
//         .reply(200, fixtures.orgRepos)
//         })
//       it('should get a list of all repos for the specified organization'), async() => {
//         const source = new AhaSource();
//         const data = await source.listOrgRepos(config);
//         console.log(data);
//         assert.ok(data);
//       };
//     });

//     // GET /repos/:owner/:repo/comments
//     describe('#getAllCommitComments()', () => {
//       before(function(){
//         nock(URL)
//         .get('/repos/${user}/${repo}/comments')
//         .reply(200, fixtures.orgRepos)
//         })
//       it('should get a list of all comments for commits in a repo'), async() => {
//         const source = new AhaSource();
//         const data = await source.listRepoCommitComments(config);
//         console.log(data);
//         assert.ok(data);
//       };
//     });

//     // GET /repos/:owner/:repo/commits
//     describe('#getRepoCommits()', () => {
//       before(function(){
//         nock(URL)
//         .get('/repos/${user}/${repo}/commits')
//         .reply(200, fixtures.getCommits)
//         })
//       it('should get a list of all commits for a repo'), async() => {
//         const source = new AhaSource();
//         const data = await source.listRepos(config);
//         console.log(data);
//         assert.ok(data);
//       };
//     });

//     // GET /repos/:owner/:repo/collaborators
//     describe('#getCollaborators()', () => {
//       before(function(){
//         nock(URL)
//         .get('/repos/${user}/${repo}/collaborators')
//         .reply(200, fixtures.getCollaborators)
//         })
//       it('should get a list of all collaborators for a repo'), async() => {
//         const source = new AhaSource();
//         const data = await source.listCollaborators(config);
//         console.log(data);
//         assert.ok(data);
//       };
//     });
// })
});
