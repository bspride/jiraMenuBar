import { Component, Input, OnInit } from "@angular/core"
import { NgForm } from "@angular/common"
import { Router } from "@angular/router"
import { Settings } from '../models/settings'
const electron = require('electron')
const ipcRenderer = electron.ipcRenderer

@Component({
  selector: 'settings',
  templateUrl: '../templates/settings.template.html'
})
export class SettingsComponent {
  settings = new Settings("truapps/jira", "mclarke@trusimulation.com", "test", "test")

  constructor (
    private router: Router) {}

  ngOnInit() {
    this.getSettings()
  }

  getSettings() {
    //call to main to get settings from disk
  }

  saveSettings() {
    //call to main to persist settings to disk
    const connect = ipcRenderer.sendSync('jira-connect', this.settings)
    //if successful probably should show users a success message then
    //navigate to issues screen
    if (connect) {
      this.router.navigate(['/issues'])
    }
  }
}