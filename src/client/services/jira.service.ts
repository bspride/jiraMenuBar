import { Subject } from 'rxjs/Subject'

const electron = require('electron')
const ipcRenderer = electron.ipcRenderer

export class JiraService {
  issues
  issues$

  constructor () {
    this.issues = new Subject()
    this.issues$ = this.issues.asObservable()

    this.onIssues()
  }

  //Setting up issues async so we can eventually run
  //on a configurable schedule
  getIssues (jql) {
    jql = 'assignee={user} AND status=open'
    ipcRenderer.send('getIssues', jql)
  }

  onIssues () {
    let self = this
    ipcRenderer.on('issues', (event, data) => {
      self.issues.next(data.issues)
    })
  }
}