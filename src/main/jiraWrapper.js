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
      host: opts.basePath,
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

  getIssuesForCurrentUser (callback) {
    // let jql = {query: 'status="In Progress" AND assignee = curentuser()'}

    // TODO Updat since jira changed
    // this.api.searchJira(jql, null, callback)
  }
}

module.exports = Jira
