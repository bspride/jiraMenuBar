import { Subject } from 'rxjs/Subject'
import { Injectable, NgZone } from '@angular/core'

const electron = require('electron')
const ipcRenderer = electron.ipcRenderer

@Injectable()
export class JiraService {
  issues
  issues$
  issue
  issue$

  constructor (private zone: NgZone) {
    this.issues = new Subject()
    this.issues$ = this.issues.asObservable()
    this.issue = new Subject()
    this.issue$ = this.issue.asObservable()

    this.onIssues()
    this.onIssue()
  }

  //Setting up issues async so we can eventually run
  //on a configurable schedule
  getIssues (jql) {
    jql = 'assignee=currentUser()'
    ipcRenderer.send('getIssues', jql)
  }

  onIssues () {
    let self = this
    ipcRenderer.on('issues', (event, data) => {
      self.zone.run(() => {
        self.issues.next(data.issues)
      })
    })
  }

  getIssue (key) {
    ipcRenderer.send('getIssue', key)
  }

  onIssue () {
    let self = this
    ipcRenderer.on('issue', (event, data) => {
      self.zone.run(() => {
        self.issue.next(data)
      })
    })
  }
}