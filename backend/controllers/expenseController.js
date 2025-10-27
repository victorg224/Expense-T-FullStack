import { sql } from "../config/db.js"; // Import SQL helper

export const getExpenses = async (req, res) => {
    try { 
        const expenses = await sql(`
            SELECT * FROM expenses
            ORDER BY created_at DESC
        `);

        res.status(200).json({ success: true, data: expenses.rows}); // Fix: Use `products.rows`
    } catch (error) {
        console.error("Error fetching products:", error); // Log the actual error for debugging
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

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


/*export const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await sql`
            SELECT * FROM products WHERE id = ${id}
        `;
        if (product.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: product.rows[0] }); // Access rows[0]
    } catch (error) {
        console.log("Error in getProduct:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

/*export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, image } = req.body;

    try {
        const updateResult = await sql`
            UPDATE products
            SET name = ${name}, price = ${price}, image = ${image}
            WHERE id = ${id}
            RETURNING *
        `;

        if (updateResult.rows.length === 0) { // Check if the product was found and updated
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({ success: true, data: updateResult.rows[0] }); // Access updated product data
    } catch (error) {
        console.log("Error in updateProduct:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};  */

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

        res.status(200).json({ success: true, data: deleted[0] }); // ✅ Access like array
    } catch (error) {
        console.log("Error in deleteProduct:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

