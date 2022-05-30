import { ObjectId } from "mongodb";

export default class Produkt {
  constructor(
    public nazwa: string,
    public cena: number,
    public ilosc: number,
    public jednostkaMiary: number,
    public _id: ObjectId
  ) {}
}
