import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Settings } from '../models/settings'

const electron = require('electron')
const ipcRenderer = electron.ipcRenderer

@Injectable()
export class AuthService {
  userInfo
  connectSettings

  jiraConnect (settings) {
    // Set initial settings to write to disk
    this.connectSettings = settings
    // Get User Info from jira
    this.userInfo = ipcRenderer.sendSync('jira-connect', settings)

    if (this.userInfo) {
      return true;
    } else {
      return false;
    }
  }
}