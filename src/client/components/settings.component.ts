import { Component } from "@angular/core"
import { ROUTER_DIRECTIVES } from "@angular/router"

@Component({
  selector: 'settings',
  templateUrl: '../templates/settings.template.html',
  directives: ROUTER_DIRECTIVES
})
export class SettingsComponent {
  jiraPath: string;
  setJiraPath (path: string) {
    if(path && path.length > 0) {
      this.jiraPath = path;
    }
  }
}