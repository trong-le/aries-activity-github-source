![alt text](/img/logo.png "Aries Integration for Github")

# Aries Integration for Github

This is an integration for [Github](https://github.com/).

## Methods
This integration uses 14 methods.

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
`listRepos` - Lists all the repositories that are accessible by the authenticates user.

### List User Repos
`listUserRepos` - Lists all the public repositores for the specifed user.

### List Org Repos
`listOrgRepos` - Lists all repositories for the specified organization. 

### List Repo Comments
`listRepoComments` - Lists the commit comments for the specified repository.

### List Repo Commits
`listRepoCommits` - Lists all the commits for the specified repository.

### List Collaborators
`listCollaborators` - Lists all the collaborators for the specified repository.

## Configuration

### User
The user account to retrieve data for. 
```javascript
"user": "astronomer"
```

### Password
The password for the associated user account.
```javascript
"password": "secure_password"
```

### Method
The method to use to retrieve data. List of methods can be found above.
```javascript 
"method": "listIssues"
```