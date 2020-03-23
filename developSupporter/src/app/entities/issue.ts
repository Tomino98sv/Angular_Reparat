export class Issue{
    constructor(
        public userName: string = '',
        public uidAuthor: string = '',
        public title: string = '',
        public content: string = '',
        public reactions: Array<string> = new Array()
    ){}
}