import { sql } from "../config/db.js"; // Import SQL helper

//get expenses
export const getExpenses = async (req, res) => {
    try { 
        const expenses = await sql(`
            SELECT * FROM expenses
            ORDER BY created_at DESC
        `);

        res.status(200).json({ success: true, data: expenses.rows}); 
    } catch (error) {
        console.error("Error fetching products:", error); 
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

//New expense 
export const createExpenses = async (req, res) => {
    const { item, price, date } = req.body;

    if (!item || !price || !date) {
        return res.status(400).json({ success: false, message: "All fields required" });
    }

    try {
        const result = await sql(
            `INSERT INTO expenses (item, price, date)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [item,parseFloat(price),date]
        )
        

        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error("Error in expense creation:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

//Delete 
export const deleteExpenses = async (req, res) => {
    const { id } = req.params;
    console.log("Attemping to delete id: ", id);

    try {
        const deleted = await sql(
            `DELETE FROM expenses WHERE id = $1 RETURNING *`
            , [id]
        );

        if (deleted.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

        res.status(200).json({ success: true, data: deleted[0] }); // Access like array
    } catch (error) {
        console.log("Error in deleteProduct:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

//expense trend
export const getExpenseTrend = async (req, res) => {
    try{
        const trend = await sql(`
            SELECT
            date::date as period,
            SUM(price) as total,
            COUNT(*) as count
            FROM expenses
            GROUP BY date::date
            ORDER BY date::date ASC `

        );
       //converting string to numbers for frontend
       const formattedTrend = trend.rows.map(row => ({
        period: row.period,
        total:parseFloat(row.total),
        count: parseInt(row.count)
       }));

       res.status(200).json({
        success: true,
        data: formattedTrend
       });
    } catch (error){
        console.error("Error trend", error);
        res.status(500).json({
            success:false,
            message: "Trend data error"
        })
    }
};

//High-Lowest spending
export const getHighLow = async (req, res) => {
    try{
        const categoryTotals = await sql(` SELECT 
            item as category,
            SUM(price) as total,
            COUNT(*) as count
            FROM expenses
            GROUP BY item
            ORDER BY TOTAL DESC
            `

        );
        //Grabbing first row since DESC is used, returned as an array of numbers
        const highest = {
            category: categoryTotals.rows[0].categroy,
            total: parseFloat(categoryTotals.rows[0].total),
            count: parseInt(categoryTotals.rows[0].count)
        };

        //Last row for lowest return as numbers
        const last = categoryTotals.rows.length-1;
        const lowest = {
            category: categoryTotals.rows[last].category,
            total: parseFloat(categoryTotals.rows[last].total),
            count: parseInt(categoryTotals.rows[last].count)
        };
            res.status(200).json({
        success: true,
        data: highest, lowest
       });
    } catch (error){
        console.error("Error high/low", error);
        res.status(500).json({
            success:false,
            message: "HighLow data error"
        })
    }
    }



