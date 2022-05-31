import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import  Rezerwacja from "../models/Rezerwacja";

export const rezerwacjaRouter = express.Router();
rezerwacjaRouter.use(express.json());

rezerwacjaRouter.get("/", async (req: Request, res: Response) => {
	try {
		const rezerwacja = (await collections?.Rezerwacja?.find({}).toArray()) as Rezerwacja[];
		res.status(200).send(rezerwacja);

	}catch (error) {
		let errorMessage = "Błąd podczas pobierania rezerwacji";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(500).send(errorMessage);
	}
});

rezerwacjaRouter.get("/:id", async (req: Request, res: Response) => {
	try {
		const rezerwacja = (await collections?.Rezerwacja?.findOne({ _id: new ObjectId(req.params.id) })) as Rezerwacja;
		if(rezerwacja){
			res.status(200).send(rezerwacja);
		}else {
			res.status(404).send("Nie znaleziono rezerwacji");
		}
		

	}catch (error) {
		let errorMessage = "Błąd podczas pobierania rezerwacji";
		if (error instanceof Error) {
			errorMessage = error?.message;
		}
		res.status(500).send(errorMessage);
	}
});

rezerwacjaRouter.post("/", async (req: Request, res: Response) => {
	try {
		const rezerwacja = req.body as Rezerwacja;
		const result = await collections?.Rezerwacja?.insertOne(rezerwacja);

		result ? res.status(201).send(`Dodano rezerwacji: ${result.insertedId}`) 
		: res.status(500).send("Błąd podczas dodawania rezerwacji");

	}catch (error) {
		let errorMessage = "Błąd podczas dodawania rezerwacji";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(500).send(errorMessage);
	}
});

rezerwacjaRouter.put("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;
	try{
		const updateRezerwacja: Rezerwacja = req.body as Rezerwacja;
		const query = { _id: new ObjectId(id) };

		const result = await collections?.Rezerwacja?.updateOne(query, {$set: updateRezerwacja});

		result ? res.status(200).send(`Zaktualizowano rezerwacji: ${id}`)
		: res.status(500).send(`Błąd podczas aktualizacji rezerwacji ${id}`);
	}catch (error){
		let errorMessage = "Błąd podczas aktualizacji rezerwacji";
		if (error instanceof Error) {
			errorMessage = error?.message;
		}
		res.status(400).send(errorMessage);

	}
});

rezerwacjaRouter.delete("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;
	try{
		const query = { _id: new ObjectId(id) };
		const result = await collections?.Rezerwacja?.deleteOne(query);

		if(result && result.deletedCount){
			res.status(202).send(`Usunięto rezerwacji: ${id}`);
		} else if (!result){
			res.status(404).send(`Nie znaleziono rezerwacji: ${id}`);
		} else if (!result.deletedCount){
			res.status(500).send(`Błąd podczas usuwania rezerwacji ${id}`);
		}
	}catch (error){
		let errorMessage = "Błąd podczas usuwania rezerwacji";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(400).send(errorMessage);

	}
});

