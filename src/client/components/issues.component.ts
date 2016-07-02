import { Component, OnInit} from "@angular/core"
import { JiraService } from '../services/jira.service'

@Component({
  selector: 'issues',
  templateUrl: '../templates/issues.template.html',
  styles: [require('../templates/css/issues.component.css')]
})
export class IssuesComponent {
  issues = []

  constructor (
    private _jiraService: JiraService
  ) {}

  ngOnInit() {
    let self = this
    self._jiraService.issues$.subscribe((data) => {
      console.log(data)
      self.issues = data
    })
    self._jiraService.getIssues("")
  }
}