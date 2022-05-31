import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import  Restauracja from "../models/Restauracja";

export const restauracjaRouter = express.Router();
restauracjaRouter.use(express.json());

restauracjaRouter.get("/", async (req: Request, res: Response) => {
	try {
		const restauracja = (await collections?.Restauracja?.find({}).toArray()) as Restauracja[];
		res.status(200).send(restauracja);

	}catch (error) {
		let errorMessage = "Błąd podczas pobierania restauracja";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(500).send(errorMessage);
	}
});

restauracjaRouter.get("/:id", async (req: Request, res: Response) => {
	try {
		const restauracja = (await collections?.Restauracja?.findOne({ _id: new ObjectId(req.params.id) })) as Restauracja;
		if(restauracja){
			res.status(200).send(restauracja);
		}else {
			res.status(404).send("Nie znaleziono restauracja");
		}
		

	}catch (error) {
		let errorMessage = "Błąd podczas pobierania restauracja";
		if (error instanceof Error) {
			errorMessage = error?.message;
		}
		res.status(500).send(errorMessage);
	}
});

restauracjaRouter.post("/", async (req: Request, res: Response) => {
	try {
		const restauracja = req.body as Restauracja;
		const result = await collections?.Restauracja?.insertOne(restauracja);

		result ? res.status(201).send(`Dodano restauracja: ${result.insertedId}`) 
		: res.status(500).send("Błąd podczas dodawania restauracja");

	}catch (error) {
		let errorMessage = "Błąd podczas dodawania restauracja";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(500).send(errorMessage);
	}
});

restauracjaRouter.put("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;
	try{
		const updateRestauracja: Restauracja = req.body as Restauracja;
		const query = { _id: new ObjectId(id) };

		const result = await collections?.Restauracja?.updateOne(query, {$set: updateRestauracja});

		result ? res.status(200).send(`Zaktualizowano restauracja: ${id}`)
		: res.status(500).send(`Błąd podczas aktualizacji restauracja ${id}`);
	}catch (error){
		let errorMessage = "Błąd podczas aktualizacji restauracja";
		if (error instanceof Error) {
			errorMessage = error?.message;
		}
		res.status(400).send(errorMessage);

	}
});

restauracjaRouter.delete("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;
	try{
		const query = { _id: new ObjectId(id) };
		const result = await collections?.Restauracja?.deleteOne(query);

		if(result && result.deletedCount){
			res.status(202).send(`Usunięto restauracja: ${id}`);
		} else if (!result){
			res.status(404).send(`Nie znaleziono restauracja: ${id}`);
		} else if (!result.deletedCount){
			res.status(500).send(`Błąd podczas usuwania restauracja ${id}`);
		}
	}catch (error){
		let errorMessage = "Błąd podczas usuwania restauracja";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(400).send(errorMessage);

	}
});

