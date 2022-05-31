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

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    "mongodb+srv://Admin:12345@restauracjadb.lxldi.mongodb.net/?retryWrites=true&w=majority"
  );
  await client.connect();
  const db: mongoDB.Db = client.db("RestauracjaDB");
  const DanieCollection: mongoDB.Collection = db.collection("Danie");
  const PracownikCollection: mongoDB.Collection = db.collection("Pracownik");
  const ProduktCollection: mongoDB.Collection = db.collection("Produkt");
  const RestauracjaCollection: mongoDB.Collection =
    db.collection("Restauracja");
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

  await db.command({
    collMod: "Danie",
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["nazwa", "cena", "kategoria"],
        additionalProperties: false,
        properties: {
          _id: {},
          nazwa: {
            bsonType: "string",
            description: "'nazwa' is required and is a string",
          },
          cena: {
            bsonType: "number",
            description: "'cena' is required and is a number",
          },
          kategoria: {
            bsonType: "string",
            description: "'kategoria' is required and is a string",
          },
        },
      },
    },
  });

  await db.command({
    collMod: "Pracownik",
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["imie", "nazwisko", "stanowisko"],
        additionalProperties: false,
        properties: {
          _id: {},
          imie: {
            bsonType: "string",
            description: "'imie' is required and is a string",
          },
          nazwisko: {
            bsonType: "string",
            description: "'nazwisko' is required and is a string",
          },
          stanowisko: {
            bsonType: "string",
            description: "'stanowisko' is required and is a string",
          },
        },
      },
    },
  });

  await db.command({
    collMod: "Produkt",
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["nazwa", "cena", "ilosc", "jednostkaMiary"],
        additionalProperties: false,
        properties: {
          _id: {},
          nazwa: {
            bsonType: "string",
            description: "'nazwa' is required and is a string",
          },
          cena: {
            bsonType: "number",
            description: "'cena' is required and is a number",
          },
          ilosc: {
            bsonType: "number",
            description: "'ilosc' is required and is a number",
          },
          jednostkaMiary: {
            bsonType: "number",
            description: "'jednostkaMiary' is required and is a number",
          },
        },
      },
    },
  });

  await db.command({
    collMod: "Restauracja",
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["nazwa", "adres", "telefon", "nip", "email", "www"],
        additionalProperties: false,
        properties: {
          _id: {},
          nazwa: {
            bsonType: "string",
            description: "'nazwa' is required and is a string",
          },
          adres: {
            bsonType: "string",
            description: "'adres' is required and is a string",
          },
          telefon: {
            bsonType: "string",
            description: "'telefon' is required and is a string",
          },
          nip: {
            bsonType: "string",
            description: "'nip' is required and is a string",
          },
          email: {
            bsonType: "string",
            description: "'email' is required and is a string",
          },
          www: {
            bsonType: "string",
            description: "'www' is required and is a string",
          },
        },
      },
    },
  });
}
