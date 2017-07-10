![alt text](/img/logo.png "Aries Integration for Github")

# Aries Integration for Github

This is an integration for [Github](https://github.com/).

[![CircleCI](https://circleci.com/gh/aries-data/aries-activity-github-source.svg?style=svg)](https://circleci.com/gh/aries-data/aries-activity-github-source)

## Methods
This integration uses 13 methods.

### List Available Assignees
`listAvailableAssignees` - Lists all the available assignees to which issues may be assigned.

*Parameters:*
  - `owner`
  - `repo`

### List Collaborators
`listCollaborators` - Lists all the collaborators for the specified repository.

*Parameters:*
  - `owner`
  - `repo`

### List Issues
`listIssues` - List all issues for the specified repository.

*Parameters:*
  - `owner`
  - `repo`
  - `since` (optional)
  - `state` (optional)

### List Issue Comments
`listIssueComments` - Lists all comments in the specified repository and issue.

*Parameters:*
  - `owner`
  - `number`
  - `repo`
  - `since` (optional)

### List Issue Events
`listIssueEvents` - Lists the events that occurred for the specified repository and issue.

*Parameters:*
  - `owner`
  - `number`
  - `repo`

### List Merged Pull Requests
`listMergedPullRequests` - List all pull requests that have been merged.

*Parameters:*
  - `owner`
  - `repo`
  - `state` (optional)

### List Org Members
`listOrgMembers` - Lists all members for the specified organization.

*Parameters:*
  - `org`

### List Org Repos
`listOrgRepos` - Lists all repositories for the specified organization.

*Parameters:*
  - `org`

### List Pull Requests
`listPullRequests` - List all pull requests, filtered by state of pull request, for the given owner and repository.

*Parameters:*
  - `owner`
  - `repo`
  - `state` (optional)

### List Repos
`listRepos` - Lists all the repositories that are accessible by the authenticated user.

*Parameters:*
  - `user`

### List Repo Comments
`listRepoComments` - Lists all comments in the specified repository.

*Parameters:*
  - `owner`
  - `repo`
  - `since` (optional)

### List Repo Commit Comments
`listRepoCommitComments` - Lists the commit comments for the specified repository.

*Parameters:*
  - `owner`
  - `repo`

### List Repo Commits
`listRepoCommits` - Lists all the commits for the specified repository.

*Parameters:*
  - `owner`
  - `repo`
  - `since`
  - `until`

### List Repo Events
`listRepoEvents` - Lists the events that occurred for the specified repository.

*Parameters:*
  - `owner`
  - `repo`
  - `user`
  - `since` (optional)
  - `until` (optional)

## Configuration

The configuration takes 3 required parameters, `user`, `password`, and `method`. And for each method, the required parameters vary.

### Issue Num
The issue num is the number of the specified issue.
```javascript
"issueNum": "4"
```

### Method
The `method` parameter is the method used to retrieve data. List of methods can be found above.
```javascript
"method": "listIssues"
```

### Org
The `org` parameter is the name of the group-owned repository to grab data for.
```javascript
"org": "astronomer"
```

### Owner
The `owner` parameter is the name of the profile in which the repository is nested, equal either to the `user` or `org` parameter. If using the `allOrg` method for repos, this is equal to the `org` parameter.
```javascript
"owner": "astronomer"
```

### Repo
The `repo` parameter is the specific repository to grab information from. Required in all methods but `listOrgRepos`. Note: setting the repo field to `allUser` or `allOrg` will cause the activity to first fetch a list of all repositories that the user account has access to (either personal or within an organization respectively), then run the specified `method` on each repository.
```javascript
"repo": "test_repo"
```

### Since
The `since` parameter specifies the earliest timestamp bound in the record request to Github. If set to `lastRun`, this parameter will be set to the last execution date of the pipeline. By default, this parameter is set to `2004-01-01T00:00:00.000Z`.
```javascript
"since": "lastRun"
```

### State
The `state` parameter specifies the state of the pull request inside of a repository. Default is `all`.
```javascript
"state": "closed"
```

### Token
The `token` parameter is the access token associated with your user account. An access token can be retrieved from your Settings > Personal Access Tokens (in the left sidebar under Developer settings) > Generate new access token. The access token is only visible upon creating it, so store it after generating it.
```javascript
"token": "17238f586ba33465iijr403ca2f6a8640b4847b8"
```

### Until
The `until` parameter specifies the latest timestamp bound in the record request to Github. If set to `lastRun`, this parameter will be set to the last execution date of the pipeline. By default, this parameter is set to the current timestamp.
```javascript
"until": "lastRun"
```

### User
The user account to retrieve data for.
```javascript
"user": "astronomer"
```

## Response
This is an example response with the `listIssues` endpoint.
```javascript
  {
    "id": 1,
    "url": "https://api.github.com/repos/octocat/Hello-World/issues/1347",
    "repository_url": "https://api.github.com/repos/octocat/Hello-World",
    "labels_url": "https://api.github.com/repos/octocat/Hello-World/issues/1347/labels{/name}",
    "comments_url": "https://api.github.com/repos/octocat/Hello-World/issues/1347/comments",
    "events_url": "https://api.github.com/repos/octocat/Hello-World/issues/1347/events",
    "html_url": "https://github.com/octocat/Hello-World/issues/1347",
    "number": 1347,
    "state": "open",
    "title": "Found a bug",
    "body": "I'm having a problem with this.",
    "user": {
      "login": "octocat",
      "id": 1,
      "avatar_url": "https://github.com/images/error/octocat_happy.gif",
      "gravatar_id": "",
      "url": "https://api.github.com/users/octocat",
      "html_url": "https://github.com/octocat",
      "followers_url": "https://api.github.com/users/octocat/followers",
      "following_url": "https://api.github.com/users/octocat/following{/other_user}",
      "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
      "organizations_url": "https://api.github.com/users/octocat/orgs",
      "repos_url": "https://api.github.com/users/octocat/repos",
      "events_url": "https://api.github.com/users/octocat/events{/privacy}",
      "received_events_url": "https://api.github.com/users/octocat/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [
      {
        "url": "https://api.github.com/repos/octocat/Hello-World/labels/bug",
        "name": "bug",
        "color": "f29513"
      }
    ],
    "assignee": {
      "login": "octocat",
      "id": 1,
      "avatar_url": "https://github.com/images/error/octocat_happy.gif",
      "gravatar_id": "",
      "url": "https://api.github.com/users/octocat",
      "html_url": "https://github.com/octocat",
      "followers_url": "https://api.github.com/users/octocat/followers",
      "following_url": "https://api.github.com/users/octocat/following{/other_user}",
      "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
      "organizations_url": "https://api.github.com/users/octocat/orgs",
      "repos_url": "https://api.github.com/users/octocat/repos",
      "events_url": "https://api.github.com/users/octocat/events{/privacy}",
      "received_events_url": "https://api.github.com/users/octocat/received_events",
      "type": "User",
      "site_admin": false
    },
    "milestone": {
      "url": "https://api.github.com/repos/octocat/Hello-World/milestones/1",
      "html_url": "https://github.com/octocat/Hello-World/milestones/v1.0",
      "labels_url": "https://api.github.com/repos/octocat/Hello-World/milestones/1/labels",
      "id": 1002604,
      "number": 1,
      "state": "open",
      "title": "v1.0",
      "description": "Tracking milestone for version 1.0",
      "creator": {
        "login": "octocat",
        "id": 1,
        "avatar_url": "https://github.com/images/error/octocat_happy.gif",
        "gravatar_id": "",
        "url": "https://api.github.com/users/octocat",
        "html_url": "https://github.com/octocat",
        "followers_url": "https://api.github.com/users/octocat/followers",
        "following_url": "https://api.github.com/users/octocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
        "organizations_url": "https://api.github.com/users/octocat/orgs",
        "repos_url": "https://api.github.com/users/octocat/repos",
        "events_url": "https://api.github.com/users/octocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/octocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "open_issues": 4,
      "closed_issues": 8,
      "created_at": "2011-04-10T20:09:31Z",
      "updated_at": "2014-03-03T18:58:10Z",
      "closed_at": "2013-02-12T13:22:01Z",
      "due_on": "2012-10-09T23:39:01Z"
    },
    "locked": false,
    "comments": 0,
    "pull_request": {
      "url": "https://api.github.com/repos/octocat/Hello-World/pulls/1347",
      "html_url": "https://github.com/octocat/Hello-World/pull/1347",
      "diff_url": "https://github.com/octocat/Hello-World/pull/1347.diff",
      "patch_url": "https://github.com/octocat/Hello-World/pull/1347.patch"
    },
    "closed_at": null,
    "created_at": "2011-04-22T13:33:48Z",
    "updated_at": "2011-04-22T13:33:48Z"
  }
]
```

## License
MIT
