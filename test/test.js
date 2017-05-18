import {assert} from 'chai';
import GithubSource from '../lib/index.js';
import config from './test-config';

describe('GithubSource', () => {
    describe('authenticatedClient', () => {

    });
    it ('authenticates the client and gets all orgs', async () => {
        const { user, repo } = config;
        const source = new GithubSource();
        const client = source.authenticatedClient(config);
        const data = await source.getAllOrg(config, client);
        assert.isOk(data);
    });
});
