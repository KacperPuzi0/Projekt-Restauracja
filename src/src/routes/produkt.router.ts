import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import  Produkt from "../models/Produkt";

export const produktRouter = express.Router();
produktRouter.use(express.json());

produktRouter.get("/", async (req: Request, res: Response) => {
	try {
		const produkt = (await collections?.Produkt?.find({}).toArray()) as Produkt[];
		res.status(200).send(produkt);

	}catch (error) {
		let errorMessage = "Błąd podczas pobierania produktu";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(500).send(errorMessage);
	}
});

produktRouter.get("/:id", async (req: Request, res: Response) => {
	try {
		const produkt = (await collections?.Produkt?.findOne({ _id: new ObjectId(req.params.id) })) as Produkt;
		if(produkt){
			res.status(200).send(produkt);
		}else {
			res.status(404).send("Nie znaleziono produktu");
		}
		

	}catch (error) {
		let errorMessage = "Błąd podczas pobierania produktu";
		if (error instanceof Error) {
			errorMessage = error?.message;
		}
		res.status(500).send(errorMessage);
	}
});

produktRouter.post("/", async (req: Request, res: Response) => {
	try {
		const produkt = req.body as Produkt;
		const result = await collections?.Produkt?.insertOne(produkt);

		result ? res.status(201).send(`Dodano produktu: ${result.insertedId}`) 
		: res.status(500).send("Błąd podczas dodawania produktu");

	}catch (error) {
		let errorMessage = "Błąd podczas dodawania produktu";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(500).send(errorMessage);
	}
});

produktRouter.put("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;
	try{
		const updateProdukt: Produkt = req.body as Produkt;
		const query = { _id: new ObjectId(id) };

		const result = await collections?.Produkt?.updateOne(query, {$set: updateProdukt});

		result ? res.status(200).send(`Zaktualizowano produktu: ${id}`)
		: res.status(500).send(`Błąd podczas aktualizacji produktu ${id}`);
	}catch (error){
		let errorMessage = "Błąd podczas aktualizacji produktu";
		if (error instanceof Error) {
			errorMessage = error?.message;
		}
		res.status(400).send(errorMessage);

	}
});

produktRouter.delete("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;
	try{
		const query = { _id: new ObjectId(id) };
		const result = await collections?.Produkt?.deleteOne(query);

		if(result && result.deletedCount){
			res.status(202).send(`Usunięto Produktu: ${id}`);
		} else if (!result){
			res.status(404).send(`Nie znaleziono Produktu: ${id}`);
		} else if (!result.deletedCount){
			res.status(500).send(`Błąd podczas usuwania Produktu ${id}`);
		}
	}catch (error){
		let errorMessage = "Błąd podczas usuwania Produktu";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(400).send(errorMessage);

	}
});

