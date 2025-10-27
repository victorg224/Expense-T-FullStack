import express from "express";

import {getExpenses, createExpenses, deleteExpenses} from "../controllers/expenseController.js";


const router = express.Router();

router.get("/", getExpenses);

router.post("/", createExpenses);

router.delete('/:id', deleteExpenses);




export default router;