const Todo = require("../models/todoModel");

//get all the todos
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find(); 
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch todos" });
    }
};

// single todo with the id
exports.getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch the todo" });
    }
};

// post a todo
exports.createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }
        const newTodo = new Todo({ title });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: "Failed to create todo" });
    }
};

// update the todo
exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title, completed },
            { new: true } 
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: "Failed to update todo" });
    }
};

// Delete the todo
exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete todo" });
    }
};
