export class Order {
    constructor(
        public number: string,
        public total: string,
        public date: Date,
        public state: string,
        public products : []
    ) { }
}