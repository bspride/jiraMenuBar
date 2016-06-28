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
    this.jira = new JiraApi('https', opts.host, opts.port, opts.user, opts.password)
  }

  getIssues () {
    return this.jira.Issues()
  }
}

module.exports = Jira
