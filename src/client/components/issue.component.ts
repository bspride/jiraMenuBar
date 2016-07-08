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
  comments: any
  private issueSub: any
  private routeSub: any

  constructor(
    private _route: ActivatedRoute,
    private _jiraService: JiraService) {
      console.log(this._route.params)
      this.comments = null
    }

  ngOnInit() {
    let self = this
    let key = this._route.snapshot.params['key']
    console.log(key)
    
    self.subscribe()

    self._jiraService.getIssue(key)
    self._jiraService.getComments(key)
  }

  subscribe () {
    let self = this
    // Issue subscription
    self._jiraService.issue$.subscribe((data) => {
      self.issue = data
      if (self.issue.fields.description) {
        self.description = j2m.jira_to_html(self.issue.fields.description)
      } else {
        self.description = 'No description'
      }
      console.log(self.description)
    })
    // Comments subscription
    self._jiraService.comment$.subscribe((data) => {
      self.comments = data.comments
    })
  }

  onRefresh (refresh: boolean) {
    let self = this
    let key = this._route.snapshot.params['key']

    if (refresh) {
      self._jiraService.getComments(key)
    }
  }
}