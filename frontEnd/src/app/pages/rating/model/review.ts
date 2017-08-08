import { Rating } from "./rating";
export class Review {
    constructor(public id : string, public review : string, 
                public rating : Rating) {}
}
