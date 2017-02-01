'use strict';

require('dotenv').config();

const config = {
	user: process.env.USER ? process.env.USER :'benjaminrgregory',
	token: process.env.TOKEN ? process.env.TOKEN : '13214u21u34oi12up43o231u',
	repo: process.env.REPO ? process.env.REPO : 'test_repo',
    org: process.env.ORG ? process.env.ORG : 'astronomerio',
    method: process.env.METHOD ? process.env.METHOD : 'listIssues'
};

export default config;
