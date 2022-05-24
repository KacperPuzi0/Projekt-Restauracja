import { ObjectId } from "mongodb";
import Stolik from "./Stolik";

export default class Rezerwacja {
	constructor(
		public _id: ObjectId,
		public stolik: Stolik,
		public start: Date,
		public koniec: Date,
		public klient : string,
		
	)
	{}

}