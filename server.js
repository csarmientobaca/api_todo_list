const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()

const PORT = 5000

app.use(cors()); 
app.use(bodyParser.json());

let todos = 
    [
        { 
        id: 1, 
        title: "Sample Task", 
        completed: false },
        { 
        id: 2, 
        title: "Sample Task2", 
        completed: true }
    
    ]

//ALL
app.get("/todos", (req, res) => {
    res.json(todos);
});

//get
app.get("/todos/:id", (req, res) => {
    const{ id } = req.params
    if (!id) {
        return res.status(400).json({ error: "ID ist  required" })
    }
    const todo = todos.find((todo) => todo.id === parseInt(id))
    if(!todo){
        return res.status(404).json ({ error: "not found"})
    }
    res.status(200).json(todo)


});



//POST CREATE
app.post("/todos", (req, res) => {
    const { title } = req.body
    if (!title) {
        return res.status(400).json({ error: "Title is required" })
    }
    const newTodo = { id: todos.length + 1, title, completed: false }
    todos.push(newTodo)
    res.status(201).json(newTodo)
});

//UPDATE/PUT TASK
app.put("/todos/:id", (req, res) =>{
    const{ id } = req.params
    const {title, completed} = req.body

    const todo = todos.find((todo) => todo.id === parseInt(id))

    if(!todo){
        return res.status(404).json ({ error: "not found"})
    }

    if (title !== undefined ){
        todo.title = title
    }

    if(completed !== undefined){
        todo.complete = completed;
    }

    req.json(todo)
})

//DELETE
app.delete("/todos/:id", (req, res) => {
    const { id } = req.params

    const index = todos.findIndex((todo) => todo.id === parseInt(id))
    if (index === -1) {
        return res.status(404).json({ error: "Task not found" })
    }

    todos.splice(index, 1)
    res.status(204).send() //IF THERE IS NOTHING 
});

//LETS GOO
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});