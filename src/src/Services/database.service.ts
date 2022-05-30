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

	const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
	await client.connect();
	const db: mongoDB.Db = client.db(process.env.DB_NAME);
	const DanieCollection: mongoDB.Collection = db.collection(process.env.DANIE_COLLECTION);
	const PracownikCollection: mongoDB.Collection = db.collection(process.env.PRACOWNIK_COLLECTION);
	const ProduktCollection: mongoDB.Collection = db.collection(process.env.PRODUKT_COLLECTION);
	const RestauracjaCollection: mongoDB.Collection = db.collection(process.env.RESTAURACJA_COLLECTION);
	const RezerwacjaCollection: mongoDB.Collection = db.collection(process.env.REZERWACJA_COLLECTION);
	const StolikCollection: mongoDB.Collection = db.collection(process.env.STOLIK_COLLECTION);
	const ZamowienieCollection: mongoDB.Collection = db.collection(process.env.ZAMOWIENIE_COLLECTION);

	collections.Danie = DanieCollection;
	collections.Pracownik = PracownikCollection;
	collections.Produkt = ProduktCollection;
	collections.Restauracja = RestauracjaCollection;
	collections.Rezerwacja = RezerwacjaCollection;
	collections.Stolik = StolikCollection;
	collections.Zamowienie = ZamowienieCollection;

	console.log(`Connected to database: ${process.env.DB_NAME}`);
}