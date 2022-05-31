import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import  Pracownik  from "../models/Pracownik";

export const pracownikRouter = express.Router();
pracownikRouter.use(express.json());

pracownikRouter.get("/", async (req: Request, res: Response) => {
	try {
		const pracownik = (await collections?.Pracownik?.find({}).toArray()) as Pracownik[];
		res.status(200).send(pracownik);

	}catch (error) {
		let errorMessage = "Błąd podczas pobierania pracownika";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(500).send(errorMessage);
	}
});

pracownikRouter.get("/:id", async (req: Request, res: Response) => {
	try {
		const pracownik = (await collections?.Pracownik?.findOne({ _id: new ObjectId(req.params.id) })) as Pracownik;
		if(pracownik){
			res.status(200).send(pracownik);
		}else {
			res.status(404).send("Nie znaleziono pracownika");
		}
		

	}catch (error) {
		let errorMessage = "Błąd podczas pobierania pracownika";
		if (error instanceof Error) {
			errorMessage = error?.message;
		}
		res.status(500).send(errorMessage);
	}
});

pracownikRouter.post("/", async (req: Request, res: Response) => {
	try {
		const pracownik = req.body as Pracownik;
		const result = await collections?.Pracownik?.insertOne(pracownik);

		result ? res.status(201).send(`Dodano pracownika: ${result.insertedId}`) 
		: res.status(500).send("Błąd podczas dodawania pracownika");

	}catch (error) {
		let errorMessage = "Błąd podczas dodawania pracownika";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(500).send(errorMessage);
	}
});

pracownikRouter.put("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;
	try{
		const updatePracownik: Pracownik = req.body as Pracownik;
		const query = { _id: new ObjectId(id) };

		const result = await collections?.Pracownik?.updateOne(query, {$set: updatePracownik});

		result ? res.status(200).send(`Zaktualizowano pracownika: ${id}`)
		: res.status(500).send(`Błąd podczas aktualizacji pracownika ${id}`);
	}catch (error){
		let errorMessage = "Błąd podczas aktualizacji pracownika";
		if (error instanceof Error) {
			errorMessage = error?.message;
		}
		res.status(400).send(errorMessage);

	}
});

pracownikRouter.delete("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;
	try{
		const query = { _id: new ObjectId(id) };
		const result = await collections?.Pracownik?.deleteOne(query);

		if(result && result.deletedCount){
			res.status(202).send(`Usunięto Pracownika: ${id}`);
		} else if (!result){
			res.status(404).send(`Nie znaleziono Pracownika: ${id}`);
		} else if (!result.deletedCount){
			res.status(500).send(`Błąd podczas usuwania Pracownika ${id}`);
		}
	}catch (error){
		let errorMessage = "Błąd podczas usuwania Pracownika";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(400).send(errorMessage);

	}
});


