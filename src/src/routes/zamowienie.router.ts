import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Zamowienie from "../models/Zamowienie";

export const zamowienieRouter = express.Router();
zamowienieRouter.use(express.json());

zamowienieRouter.get("/", async (req: Request, res: Response) => {
	try {
		const zamowienie = (await collections?.Zamowienie?.find({}).toArray()) as Zamowienie[];
		res.status(200).send(zamowienie);

	}catch (error) {
		let errorMessage = "Błąd podczas pobierania zamowienie";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(500).send(errorMessage);
	}
});

zamowienieRouter.get("/:id", async (req: Request, res: Response) => {
	try {
		const zamowienie = (await collections?.Zamowienie?.findOne({ _id: new ObjectId(req.params.id) })) as Zamowienie;
		if(zamowienie){
			res.status(200).send(zamowienie);
		}else {
			res.status(404).send("Nie znaleziono zamowienia");
		}
		

	}catch (error) {
		let errorMessage = "Błąd podczas pobierania zamowienia";
		if (error instanceof Error) {
			errorMessage = error?.message;
		}
		res.status(500).send(errorMessage);
	}
});

zamowienieRouter.post("/", async (req: Request, res: Response) => {
	try {
		const zamowienie = req.body as Zamowienie;
		const result = await collections?.Zamowienie?.insertOne(zamowienie);

		result ? res.status(201).send(`Dodano zamowienie: ${result.insertedId}`) 
		: res.status(500).send("Błąd podczas dodawania zamowienie");

	}catch (error) {
		let errorMessage = "Błąd podczas dodawania zamowienie";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(500).send(errorMessage);
	}
});

zamowienieRouter.put("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;
	try{
		const updateZamowienie: Zamowienie = req.body as Zamowienie;
		const query = { _id: new ObjectId(id) };

		const result = await collections?.Zamowienie?.updateOne(query, {$set: updateZamowienie});

		result ? res.status(200).send(`Zaktualizowano zamowienie: ${id}`)
		: res.status(500).send(`Błąd podczas aktualizacji zamowienie ${id}`);
	}catch (error){
		let errorMessage = "Błąd podczas aktualizacji zamowienie";
		if (error instanceof Error) {
			errorMessage = error?.message;
		}
		res.status(400).send(errorMessage);

	}
});

zamowienieRouter.delete("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;
	try{
		const query = { _id: new ObjectId(id) };
		const result = await collections?.Zamowienie?.deleteOne(query);

		if(result && result.deletedCount){
			res.status(202).send(`Usunięto zamowienie: ${id}`);
		} else if (!result){
			res.status(404).send(`Nie znaleziono zamowienie: ${id}`);
		} else if (!result.deletedCount){
			res.status(500).send(`Błąd podczas usuwania zamowienie ${id}`);
		}
	}catch (error){
		let errorMessage = "Błąd podczas usuwania zamowienie";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(400).send(errorMessage);

	}
});

