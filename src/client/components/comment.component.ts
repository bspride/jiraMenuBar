import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
@Component({
  selector: 'my-comments',
  templateUrl: '../templates/comment.template',
  styles: [require('../templates/css/comment.component.css')]
})
export class CommentComponent {
  @Input() commentObj: any

  ngOnInit () {
    // TODO Set any class variables
  }
}
