![alt text](/img/logo.png "Aries Integration for Github")

# Aries Integration for Github

This is an integration to fetch data from [Github](https://github.com/).

## Methods
This integration uses 13 methods.

### List Issues
`listIssues` - List all issues for the specified repository.

### List Assignees
`listAssignees` - Lists all the available assignees to which issues may be assigned.

### List Issue Comments
`listIssueComments` - Lists all comments in the specified repository and issue.

### List Repo Comments
`listRepoComments` - Lists all comments in the specified repository.

### List Issue Events
`listIssueEvents` - Lists the events that occurred for the specified repository and issue.

### List Repo Events
`listRepoEvents` - Lists the events that occurred for the specified repository.

### List Pull Requests
`listPullRequests` - List all pull requests, filtered by state of pull request, for the given owner and repository.

### List Merged Pull Requests
`listMergedPullRequests` - List all pull requests that have been merged.

### List Repos
`listRepos` - Lists all the repositories that are accessible by the authenticated user.

### List Repo Commit Comments
`listRepoCommitComments` - Lists the commit comments for the specified repository.

### List Repo Commits
`listRepoCommits` - Lists all the commits for the specified repository.

### List Collaborators
`listCollaborators` - Lists all the collaborators for the specified repository.

## Configuration

The configuration takes 3 required parameters, `user`, `password`, and `method`. For each method, the required parameters vary.

### User
The user account to retrieve data for.
```javascript
"user": "astronomer"
```

### Token
The token is the access token associated with your user account. An access token can be retrieved from your Settings > Personal Access Tokens (in the left sidebar under Developer settings) > Generate new access token. The access token is only visible upon creating it, so store it after generating it.
```javascript
"token": "17238f586ba33465iijr403ca2f6a8640b4847b8"
```

### Method
The method used to retrieve data. List of methods can be found above.
```javascript
"method": "listIssues"
```

<<<<<<< Updated upstream
### Repo
The repo is the specific repository to grab information from. Required in all methods but `listOrgRepos`. Note: setting the repo field to `all` will cause the activity to first fetch a list of all repositories, then run the specified `method` on each repository.
=======
### Owner
The name of the repository's owner. Required in all methods. Note: This field will be equal to either an organization or user's name.
>>>>>>> Stashed changes
```javascript
"owner": "aries-data"
```

### Repo
The repo is the specific repository to grab information from. Required in all methods except `listOrgRepos`. Note: setting the repo field to `all` will cause the activity to first fetch a list of all repositories that the user account has access to (taking the `owner` field into account), then run the specified `method` on each repository.
```javascript
"repo": "test_repo"
```

### Issue Number
The issue num is the number of the specified issue. This parameter is only required in the method `listIssueEvents`.
```javascript
"issue_number": "4"
```

### State
The state parameter specifies the state of the pull request inside of a repository. Default is `all`. This parameter is only used in `listPullRequests`.
```javascript
"state": "closed"
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
