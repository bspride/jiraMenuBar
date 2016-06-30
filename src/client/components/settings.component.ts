import { Component, Input, OnInit } from "@angular/core"
import { NgForm } from "@angular/common"
import { Router } from "@angular/router"
import { Settings } from '../models/settings'
import { AuthService } from '../services/auth.service'

const electron = require('electron')
const ipcRenderer = electron.ipcRenderer

@Component({
  selector: 'settings',
  templateUrl: '../templates/settings.template.html'
})
export class SettingsComponent {
  settings = new Settings("truapps/jira", "mclarke@trusimulation.com", "test", "test")

  constructor (
    private router: Router,
    private _authService: AuthService
    ) {}

  ngOnInit() {
    this.getSettings()
  }

  getSettings() {
    //call to main to get settings from disk
  }

  saveSettings() {
    // Call to AuthService
    let connect = this._authService.jiraConnect(this.settings)
    //if successful probably should show users a success message then
    //navigate to issues screen
    if (connect) {
      this.router.navigate(['/issues'])
    }
  }
}