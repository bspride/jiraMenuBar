/**
 * Wrapper around jira module
 *
 */

const JiraApi = require('jira-connector')

class Jira {
  constructor (opts) {
    this.connect(opts)
  }

  connect (opts) {
    this.api = new JiraApi({
      host: opts.host,
      protocol: opts.protocol,
      basic_auth: {
        username: opts.userName,
        password: opts.password
      }
    })
  }

  getUserInfo (info, cb) {
    this.api.myself.getMyself({}, cb)
  }

  getIssues (jql, cb) {
    var opts = {
      jql: jql,
      startAt: 0,
      maxResults: 10
    }

    this.api.search.search(opts, cb)
  }

  getIssue (key, cb) {
    this.api.issue.getIssue({
      issueKey: key
    }, cb)
  }
}
module.exports = Jira
