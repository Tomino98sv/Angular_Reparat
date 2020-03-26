export class RegisterModel {
    constructor(
        public name: string = '',
        public email: string = '',
        public password: string = '',
        public jobstatus: string = '',
        public knowledges: Array<string> = new Array<string>()
    ){}
}
