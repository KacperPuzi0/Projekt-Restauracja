import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: {
  Danie?: mongoDB.Collection;
  Pracownik?: mongoDB.Collection;
  Produkt?: mongoDB.Collection;
  Restauracja?: mongoDB.Collection;
  Rezerwacja?: mongoDB.Collection;
  Stolik?: mongoDB.Collection;
  Zamowienie?: mongoDB.Collection;
} = {};

export async function connectToDatabase() {
	dotenv.config();

	const client: mongoDB.MongoClient = new mongoDB.MongoClient("mongodb+srv://Admin:12345@restauracjadb.lxldi.mongodb.net/?retryWrites=true&w=majority");
	await client.connect();
	const db: mongoDB.Db = client.db("RestauracjaDB");
	const DanieCollection: mongoDB.Collection = db.collection("Danie");
	const PracownikCollection: mongoDB.Collection = db.collection("Pracownik");
	const ProduktCollection: mongoDB.Collection = db.collection("Produkt");
	const RestauracjaCollection: mongoDB.Collection = db.collection("Restauracja");
	const RezerwacjaCollection: mongoDB.Collection = db.collection("Rezerwacja");
	const StolikCollection: mongoDB.Collection = db.collection("Stolik");
	const ZamowienieCollection: mongoDB.Collection = db.collection("Zamowienie");

	collections.Danie = DanieCollection;
	collections.Pracownik = PracownikCollection;
	collections.Produkt = ProduktCollection;
	collections.Restauracja = RestauracjaCollection;
	collections.Rezerwacja = RezerwacjaCollection;
	collections.Stolik = StolikCollection;
	collections.Zamowienie = ZamowienieCollection;

	console.log(`Connected to database: RestauracjaDB`);
}