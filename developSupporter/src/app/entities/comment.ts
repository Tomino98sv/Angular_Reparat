
export class CommentObject {
    constructor(
        public idComment: string = "",
        public authorName: string = "", 
        public logUserCom: boolean = false,
        public content: string = "",
        public title: string = ""
    ) {}
}