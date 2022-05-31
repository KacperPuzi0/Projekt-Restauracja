import { ObjectId } from "mongodb";

export default class Danie {
	constructor(
		
		public nazwa: string,
		public cena: number,
		public kategoria: string,
		public _id?: ObjectId,
	) {}
}