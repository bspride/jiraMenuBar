import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { JiraService } from '../services/jira.service'

@Component({
  selector: 'my-comments',
  templateUrl: '../templates/comment.template',
  styles: [require('../templates/css/comment.component.css')]
})
export class CommentComponent {
  @Input() commentObj: any
  @Output() refreshComments = new EventEmitter<boolean>()

  showCommentBox: boolean
  commentBtnValue: string
  commentData: string

  constructor (
    private _route: ActivatedRoute,
    private _jiraService: JiraService) {}

  ngOnInit () {
    let self = this
    self.showCommentBox = false
    self.commentData = null
    self.commentBtnValue = 'Comment'
  }

  newComment () {
    let self = this

    if (!self.showCommentBox) {
      self.showCommentBox = true
    }

    if (self.commentBtnValue === 'Comment') {
      self.commentBtnValue = 'Add'
    } else {
      self.addComment()
    }
  }

  addComment () {
    let self = this
    let key = this._route.snapshot.params['key']
    let isSuccess = false

    if (self.commentData !== null) {
      isSuccess = self._jiraService.addComment(key, self.commentData) 
      self.refreshComments.emit(isSuccess)
      self.showCommentBox = false
      self.commentData = null
      self.commentBtnValue = 'Comment'
    }
  }

  cancelComment () {
    let self = this
    self.showCommentBox = false
    self.commentBtnValue = 'Comment'
    self.commentData = null
  }
}
