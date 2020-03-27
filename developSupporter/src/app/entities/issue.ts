interface InfoAboutAuthor {
    name: string;
    jobStatus: string; 
}

export class Issue{
    constructor(
        public idDoc: string = '',
        public uidAuthor: string = '',
        public authorData: InfoAboutAuthor,
        public title: string = '',
        public content: string = '',
        public reactions: Array<string> = new Array()
    ){}
}