import { Component, OnInit} from "@angular/core"
import { Router } from "@angular/router"
import { JiraService } from '../services/jira.service'
import { LoadingIndicator, LoadingPage } from './loading.component'

@Component({
  selector: 'issues',
  templateUrl: '../templates/issues.template.html',
  styles: [require('../templates/css/issues.component.css')],
  directives: [LoadingIndicator]
})
export class IssuesComponent extends LoadingPage {
  issues = []

  constructor (
    private _jiraService: JiraService,
    private _router: Router
  ) {
    super(true)
  }

  ngOnInit() {
    let self = this
    self._jiraService.issues$.subscribe((data) => {
      this.ready()
      self.issues = data
    })
    self._jiraService.getIssues("")
  }

  onSelect(issue: any) {
    let link = ['/issue', issue.key]
    this._router.navigate(link)
  }
}