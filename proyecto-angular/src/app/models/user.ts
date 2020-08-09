export class User{
    constructor(
        public name: String,
        public password: String,
        public email: String,
        public phoneNumber: String,
        public address: String,
        public role: String,
        public orders: []
    ){ }
}