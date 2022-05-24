import { ObjectId } from "mongodb";

export default class Danie {
	constructor(
		public _id: ObjectId,
		public nazwa: string,
		public cena: number,
		public kategoria: string
	) {}
}