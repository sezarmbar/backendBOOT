export class Rating {
    constructor(public id : string, public nameOfRat : string,public description: string, 
                public veryBad : number, public bad : number, public normal : number, 
                public god : number, public veryGod : number,public createdAt: string,
                public active:boolean,public waitingTime:number) {}
}
