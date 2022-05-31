import { ObjectId } from "mongodb";
import Danie from "./Danie";
import Stolik from "./Stolik";
enum status {
  zlozony = "zlozony",
  wRealizacji = "wRealizacji",
  zrealizowany = "zrealizowany",
  rachunek = "rachunek",
}

export default class Zamowienie {
  constructor(
    public _id: ObjectId,
    public pozycje: Danie[],
    public status: status,
    public stolik: Stolik,
    public kwota: number
  ) {}
}
