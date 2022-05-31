import { ObjectId } from "mongodb";
export default class Praocwnik {
  constructor(
    public imie: string,
    public nazwisko: string,
    public stanowsiko: string,
    public _id?: ObjectId
  ) {}
}
