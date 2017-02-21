import test from 'blue-tape';
import GithubSource from '../lib/index.js';
import config from './test-config';

// example - make sure configuration is the same
test('proper configuration', t => {
    t.equal(GithubSource.props.name, require('../package.json').name);
    t.equal(GithubSource.props.version, require('../package.json').version);
    t.end();
});

test('test individual methods', async (t) => {
    const source = new GithubSource();
    const client = source.authenticatedClient(config);

    const methods = [
        'listIssues', 'listAssignees', 'listIssueComments',
        'listRepoComments', 'listIssueEvents', 'listRepoEvents',
        'listPullRequests', 'listMergedPullRequests', 'listRepos',
        'listRepoCommitComments', 'listRepoCommits', 'listCollaborators',
    ];

    let promises = [];
    methods.forEach(method => {
        t.comment(method);
        promises.push(source[method](config, client));
    });
    Promise.all(promises).then(results => {
        results.forEach(res => { t.ok(res); t.comment(JSON.stringify(res)) });
    }).catch(e => t.comment("ERROR: " + e));
});


test('test all repo field', async t => {
    const source = new GithubSource();
    const client = source.authenticatedClient(config);

    const methods = [
        'listIssues', 'listAssignees', 'listIssueComments',
        'listRepoComments', 'listIssueEvents', 'listRepoEvents',
        'listPullRequests', 'listMergedPullRequests', 'listRepos',
        'listRepoCommitComments', 'listRepoCommits', 'listCollaborators',
    ];

    let promises = [];
    methods.forEach(method => {
        t.comment(method);
        promises.push(source.getAll({ ...config, method }, client));
    });
    Promise.all(promises).then(results => {
        results.forEach(res => { t.ok(res); t.comment(JSON.stringify(res)); });
    }).catch(e => t.comment("ERROR: " + e));    
});
