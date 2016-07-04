import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
@Component({
  selector: 'my-comment',
  templateUrl: '../templates/comment.template',
  styles: [require('../templates/css/comment.component.css')]
})
export class CommentComponent {
  @Input() commentObj: any

  author: any
  timeLog: Date

  ngOnInit () {
    let self = this
    self.author = self.commentObj.author

    if (self.commentObj.updated > self.commentObj.created) {
      self.timeLog = new Date(self.commentObj.updated)
    } else {
      self.timeLog = new Date(self.commentObj.created)
    }
  }
}
