export class Issue{
    constructor(
        public idDoc: string = '',
        public userName: string = '',
        public uidAuthor: string = '',
        public title: string = '',
        public content: string = '',
        public reactions: Array<string> = new Array()
    ){}
}