/**
 * Wrapper around jira module
 *
 */

const JiraApi = require('jira').JiraApi

class Jira {
  constructor (opts) {
    this.connect(opts)
  }

  connect (opts) {
    this.jira = new JiraApi('http', opts.host, 80, opts.user, opts.password)
  }

  getIssuesForCurrentUser (callback) {
    let jql = {query: 'status="In Progress" AND assignee = curentuser()'}

    this.jira.searchJira(jql, null, callback)
  }
}

module.exports = Jira
