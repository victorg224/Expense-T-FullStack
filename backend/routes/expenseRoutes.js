import express from "express";

import {getExpenses, createExpenses, deleteExpenses, getExpenseTrend, getHighLow} from "../controllers/expenseController.js";


const router = express.Router();

router.get("/", getExpenses);

router.get("/trend", getExpenseTrend);

router.get("/extremes", getHighLow);

router.post("/", createExpenses);

router.delete('/:id', deleteExpenses);






export default router;