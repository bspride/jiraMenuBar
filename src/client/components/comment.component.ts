import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'my-comment',
  templateUrl: '../templates/comment.template'
})
export class CommentComponent {
  @Input()  name: string

  constructor () {}
}
