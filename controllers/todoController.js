const admin = require("../firebase");
const Todo = require("../models/todoModel");


exports.getTodos = async (req, res) => {
    try {
        if (process.env.TYPE === "multi") {
            const userId = req.user.uid; 

            const todos = await Todo.find({ userId });
            res.status(200).json(todos);
        } else {
            const todos = await Todo.find();
            res.status(200).json(todos);
        }
    } catch (error) {
        console.error("Error retrieving todos:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.createTodo = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }
    try {
        if (process.env.TYPE === "multi") {
            const userId = req.user.uid; 
            const todo = new Todo({
                title,
                userId,
            });

            await todo.save();
            res.status(201).json({ message: "Todo created successfully", todo });
        } else {
            const todo = new Todo({ title });
            await todo.save();
            res.status(201).json({ message: "Todo created successfully", todo });
        }
    } catch (error) {
        console.error("Error creating todo:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.getTodoById = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        if (process.env.TYPE === "multi") {
            const userId = req.user.uid; 

            if (todo.userId !== userId) {
                return res.status(403).json({ error: "Unauthorized to access this todo" });
            }
        }
        res.status(200).json(todo);
    } catch (error) {
        console.error("Error retrieving todo by ID:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        if (process.env.TYPE === "multi") {
            const userId = req.user.uid; // Use user ID from the middleware

            if (todo.userId !== userId) {
                return res.status(403).json({ error: "Unauthorized to update this todo" });
            }
        }

        if (title !== undefined) todo.title = title;
        if (completed !== undefined) todo.completed = completed;

        await todo.save();

        res.status(200).json({ message: "Todo updated successfully", todo });
    } catch (error) {
        console.error("Error updating todo:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        if (process.env.TYPE === "multi") {
            const userId = req.user.uid; 

            if (todo.userId !== userId) {
                return res.status(403).json({ error: "Unauthorized to delete this todo" });
            }
        }

        await Todo.findByIdAndDelete(id);

        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error("Error deleting todo:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

