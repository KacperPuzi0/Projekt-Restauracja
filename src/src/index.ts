import express from "express";
import { connectToDatabase } from "./services/database.service";
import {danieRouter} from "./routes/danie.router";
import {pracownikRouter} from "./routes/pracownik.router";
import { produktRouter } from "./routes/produkt.router";
import { restauracjaRouter } from "./routes/restauracja.router";
import { rezerwacjaRouter } from "./routes/Rezerwacja.router";
import { stolikRouter } from "./routes/stolik.router";
import { zamowienieRouter } from "./routes/zamowienie.router";

const app = express();
app.use(express.json());
const port = 3000;

connectToDatabase()
    .then(() => {
        app.use("/danie", danieRouter);
        app.use("/pracownik", pracownikRouter);
        app.use("/produkt", produktRouter);
        app.use("/restauracja", restauracjaRouter);
        app.use("/rezerwacja", rezerwacjaRouter);
        app.use("/stolik", stolikRouter);
        app.use("/zamowienie", zamowienieRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });