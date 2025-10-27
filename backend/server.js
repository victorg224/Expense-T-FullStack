import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes.js"
import pool from "./config/db.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.options('/api/expenses',cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type"]
  }));

  app.use('/api/expenses',cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type"]
  }));

  

  app.use((req,res,next)=> {
    console.log(`[${req.method}] ${req.url}`)
    next();
  });


app.use(express.json());
app.use(helmet());
app.use(morgan("dev")); 

  

app.use("/api/expenses", expenseRoutes);

async function initDB() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS expenses (
                id SERIAL PRIMARY KEY,
                item VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                date DATE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
       // await pool.query(
       // `INSERT INTO expenses (item, price, date) VALUES ($1,$2,$3)`,
       // ['Coffee',3.50,'2025-04-06']
       // );


        console.log("Database initialized successfully");
    } catch (error) {
        console.error("Error initializing database:", error);
    }
}


initDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`);
      });
      
}).catch((error) => {
    console.error("Failed to initialize the database:", error);
});

