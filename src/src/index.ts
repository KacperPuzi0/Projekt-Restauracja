import express from "express";
import { connectToDatabase } from "./services/database.service";
import { danieRouter} from "./routes/danie.router";

const app = express();
app.use(express.json());
const port = 3000;

connectToDatabase()
    .then(() => {
        app.use("/danie", danieRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });