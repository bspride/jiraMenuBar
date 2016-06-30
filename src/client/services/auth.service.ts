import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Settings } from '../models/settings'

const electron = require('electron')
const ipcRenderer = electron.ipcRenderer

@Injectable()
export class AuthService {
  private authUser
  private userInfo
  authUser$
  connectSettings

  constructor () {
    this.authUser = new Subject()
    this.authUser$ = this.authUser.asObservable()
  }

  jiraConnect (settings) {
    // Set initial settings to write to disk
    this.connectSettings = settings
    // Get User Info from jira
    this.userInfo = ipcRenderer.sendSync('jira-connect', settings)

    if (this.userInfo) {
      // Send the user info to all subscribers
      this.authUser.next(this.userInfo)
      // Return a successful connection
      return true
    } else {
      // Send failed request to subscribers
      this.authUser.next(this.userInfo)
      // Return failed connection
      return false;
    }
  }
}