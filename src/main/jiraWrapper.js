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
    this.jira = new JiraApi({
      host: opts.host,
      protocol: 'http',
      basic_auth: {
        username: opts.user,
        password: opts.password
      }
    })
  }

  // Maybe move this to a seperate class?
  getUserInfo (info, cb) {
    this.jira.myself.getMyself({}, cb)
  }

  getIssuesForCurrentUser (callback) {
    // let jql = {query: 'status="In Progress" AND assignee = curentuser()'}

    // TODO Updat since jira changed
    // this.jira.searchJira(jql, null, callback)
  }
}

module.exports = Jira
