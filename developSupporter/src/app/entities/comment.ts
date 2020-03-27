import { Optional } from '@angular/core';

export class CommentObject {
    constructor(
        public authorName: string = "", 
        public content: string = "",
        public title: string = ""
    ) {}
}