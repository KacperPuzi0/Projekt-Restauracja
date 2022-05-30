import { ObjectId } from "mongodb";
export default class Praocwnik {
	constructor (
		public _id: ObjectId,
		public imie: string,
		public nazwisko: string,
		public stanowsiko: string,
	){}
}