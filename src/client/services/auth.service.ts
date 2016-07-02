import { Injectable, NgZone } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Settings } from '../models/settings'

const electron = require('electron')
const ipcRenderer = electron.ipcRenderer

@Injectable()
export class AuthService {
  private authUser
  private userInfo
  private checkAuth
  authUser$
  checkAuth$
  connectSettings

  constructor (private zone: NgZone) {
    this.authUser = new Subject()
    this.authUser$ = this.authUser.asObservable()

    this.checkAuth = new Subject()
    this.checkAuth$ = this.checkAuth.asObservable()
  }

  jiraConnect (settings) {
    let self = this
    // Set initial settings to write to disk
    this.connectSettings = settings
    // Get User Info from jira
    this.userInfo = ipcRenderer.sendSync('jira-connect', settings)
    console.log('in auth check')
    if (this.userInfo) {
      // Send the user info to all subscribers
      this.authUser.next(this.userInfo)
    } else {
      // Send failed request to subscribers
      this.authUser.next(this.userInfo)
    }
  }

  isLoggedIn () {
    this.userInfo = ipcRenderer.sendSync('isAuthed')
    this.checkAuth.next(this.userInfo)
    return this.userInfo
  }

  disconnect () {
    return ipcRenderer.sendSync('unAuth')
  }

  getUserSettings () {
    return this.userInfo
  }
}