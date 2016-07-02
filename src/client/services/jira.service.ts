import { Subject } from 'rxjs/Subject'
import { Injectable, NgZone } from '@angular/core'

const electron = require('electron')
const ipcRenderer = electron.ipcRenderer

@Injectable()
export class JiraService {
  issues
  issues$

  constructor (private zone: NgZone) {
    this.issues = new Subject()
    this.issues$ = this.issues.asObservable()

    this.onIssues()
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
}