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
    const data = await source.getAllOrg(config, client);
    t.comment(data);
    t.ok(data);
});

test('test list issue comment with number param', async (t) => {
    const { user, repo, number } = config;
    const source = new GithubSource();
    const client = source.authenticatedClient(config);
    const data = await source.getComments(user, repo, number);
    t.comment(data);
    t.ok(data);
});
