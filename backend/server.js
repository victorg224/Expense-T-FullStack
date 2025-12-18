import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes.js"
import pool from "./config/db.js";


dotenv.config();

//creates express app instance 
const app = express();

//creates port that server will listen on
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("dev")); 

//Preflight ensures request can be made
app.options('/api/expenses',cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type"]
  }));

  //Actual request made
  app.use('/api/expenses',cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type"]
  }));


app.use("/api/expenses", expenseRoutes);


//create table if one doesnt exist
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
        console.log("Database initialized successfully");
    } catch (error) {
        console.error("Error initializing database:", error);
    }
}

//starts server after database is initilized
initDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`);
      });
      
}).catch((error) => {
    console.error("Failed to initialize the database:", error);
});

