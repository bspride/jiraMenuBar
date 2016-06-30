const electron = require('electron')
const ipcRenderer = electron.ipcRenderer
import { Subject } from 'rxjs/Subject'

export class JiraService {
  issues
  issues$

  constructor() {
    this.issues = new Subject()
    this.issues$ = this.issues.asObservable()

    this.onIssues()
  }

  //Setting up issues async so we can eventually run
  //on a configurable schedule
  getIssues (jql) {
    jql = 'assignee = bspride11@gmail.com'
    ipcRenderer.send('getIssues', jql)
  }

  onIssues () {
    let self = this
    ipcRenderer.on('issues', (event, issues) => {
      self.issues$.next(issues)
    })
  }
}