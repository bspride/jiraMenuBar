import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { JiraService } from '../services/jira.service'

@Component({
  selector: 'issue',
  templateUrl: '../templates/issue.template'
})
export class IssueComponent {

  private issue: any
  private sub: any

  constructor(
    private _route: ActivatedRoute,
    private _jiraService: JiraService) {
      console.log(this._route.params)
    }

  ngOnInit() {
    let self = this
    self._jiraService.issue$.subscribe((data) => {
      self.issue = data
      console.log(self.issue)
    })
    this.sub = this._route.params.subscribe(params => {
      let key = params['key']
      self._jiraService.getIssue(key)
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}