import { ObjectId } from "mongodb";

export default class Stolik {
  constructor(
    public _id: ObjectId,
    public nazwa: string,
    public iloscOsob: string,
    public status: string
  ) {}
}
