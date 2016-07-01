import { Component, OnInit, NgZone } from "@angular/core"
import { JiraService } from '../services/jira.service'

@Component({
  selector: 'issues',
  templateUrl: '../templates/issues.template.html'
})
export class IssuesComponent {
  issues = []

  constructor (
    private _jiraService: JiraService,
    private _ngZone: NgZone
  ) {}

  ngOnInit() {
    let self = this
    self._jiraService.issues$.subscribe((data) => {
      // Allows us to reenter angular zone
      self._ngZone.run(() => {
        self.issues = data
      })
    })
    self._jiraService.getIssues("")
  }
}