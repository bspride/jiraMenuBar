import { Component, OnInit } from "@angular/core"
import { JiraService } from '../services/jira.service'

@Component({
  selector: 'issues',
  templateUrl: '../templates/issues.template.html'
})
export class IssuesComponent {
  issues: any
  constructor(private _jiraService: JiraService) {
    this.issues = []
  }

  ngOnInit() {
    let self = this
    this._jiraService.issues$.subscribe((issues) => {
      self.issues = issues
    })
    this._jiraService.getIssues("")
  }
}