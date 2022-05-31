import { ObjectId } from "mongodb";
import Stolik from "./Stolik";

export default class Rezerwacja {
  constructor(
    public stolik: Stolik,
    public start: Date,
    public koniec: Date,
    public klient: string,
    public _id?: ObjectId
  ) {}
}
