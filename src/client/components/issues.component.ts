import { Component, OnInit } from "@angular/core"
const electron = require('electron')
const ipcRenderer = electron.ipcRenderer

@Component({
  selector: 'issues',
  templateUrl: '../templates/issues.template.html'
})
export class IssuesComponent {
  ngOnInit() {
    ipcRenderer.sendSync('jira-issues', 'bh46633')
  }
}