import { Component, Input } from "@angular/core"
import { NgForm } from "@angular/common"
const electron = require('electron')
const ipcRenderer = electron.ipcRenderer

@Component({
  selector: 'settings',
  templateUrl: '../templates/settings.template.html'
})
export class SettingsComponent {

}