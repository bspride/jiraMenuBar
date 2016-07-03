import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { JiraService } from '../services/jira.service'
import { CommentComponent } from './comment.component'

const j2m = require('jira2md')

@Component({
  selector: 'issue',
  templateUrl: '../templates/issue.template',
  directives: [CommentComponent]
})
export class IssueComponent {
  issue: any
  description: any
  comments = ['Robert', 'Clarke', 'Courtney']
  private issueSub: any
  private routeSub: any

  constructor(
    private _route: ActivatedRoute,
    private _jiraService: JiraService) {
      console.log(this._route.params)
    }

  ngOnInit() {
    let self = this
    let key = this._route.snapshot.params['key']
    console.log(key)
    self._jiraService.issue$.subscribe((data) => {
      self.issue = data
      self.description = j2m.jira_to_html(self.issue.fields.description)
      console.log(self.description)
    })
    self._jiraService.getIssue(key)
  }
}