import test from 'blue-tape';
import GithubSource from '../lib/index.js';
import config from './test-config';

// example - make sure configuration is the same
test('proper configuration', t => {
    const activity = new GithubSource();
    t.equal(GithubSource.props.name, require('../package.json').name);
    t.equal(GithubSource.props.version, require('../package.json').version);
    t.end();
});

test('test method', async (t) => {
    const { user, repo } = config;
    const source = new GithubSource();
    const client = source.authenticatedClient(config);
    const data = await source.listRepoCommits({ user, repo }, client);
    t.comment(JSON.stringify(data));
});