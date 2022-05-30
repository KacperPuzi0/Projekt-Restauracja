import { ObjectId } from "mongodb";

export default class Restauracja {
	constructor(
		public _id: ObjectId,
		public nazwa: string,
		public adres: string,
		public telefon: string,
		public nip: string,
		public email: string,
		public www: string,
	)
	{}
}
