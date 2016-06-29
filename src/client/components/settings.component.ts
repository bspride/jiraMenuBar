import { Component, Input, OnInit } from "@angular/core"
import { NgForm } from "@angular/common"
import { Settings } from '../models/settings'
const electron = require('electron')
const ipcRenderer = electron.ipcRenderer

@Component({
  selector: 'settings',
  templateUrl: '../templates/settings.template.html'
})
export class SettingsComponent {
  settings = new Settings("truapps/jira", "mclarke@trusimulation.com", "test", "test")
  data: string

  ngOnInit() {
    this.getSettings()
  }

  getSettings() {
    //call to main to get settings from disk
  }

  saveSettings() {
    //call to main to persist settings to disk
    return ipcRenderer.sendSync('jira-connect', {
      host: this.settings.basePath,
      user: '', // Add in user for testing
      password: this.settings.userName
    })
  }
}