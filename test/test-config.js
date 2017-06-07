require('dotenv').config();

export default {
	user: 'astronomerio',
	token: process.env.TOKEN,
	repo: 'all_org',
    org: 'astronomerio',
    method: 'listIssues',
    state: 'open',
    number: '1337'
};
