import { ObjectId } from "mongodb";

export default class Stolik {
  constructor(
    public nazwa: string,
    public iloscOsob: string,
    public status: string,
    public _id?: ObjectId
  ) {}
}
