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

  // Maybe move this to a seperate class?
  getUserInfo (info, cb) {
    this.api.myself.getMyself({}, cb)
  }

  getIssues (userName, callback) {
    let jql = {
      jql: 'status="In Progress" AND assignee=' + userName,
      startAt: 0,
      maxResults: 10
    }

    // TODO Updat since jira changed
    this.api.search.search(jql, callback)
  }
}
module.exports = Jira
