import { Optional } from '@angular/core';

export class CommentObject {
    constructor(
                    public authorName: string = "",
                    public content: string = "",
        @Optional() public title: string = "Developer"
    ) {}
}