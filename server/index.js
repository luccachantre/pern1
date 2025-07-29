const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //this allows us to use req.body

//ROUTES//

//create a todo
app.post("/todos", async(req, res) => {
    //async is... not quite sure (asynchronous)
    //but it allows us to use await, 
    //which is where the program will only continue after the function completes
    //actually await pauses that function until it gets what it needs to continue, 
    //while the rest of the code/program can keep running

    //try / catch is very useful for running code that could break if things are missing
    //at least I think that's how it works/why it's useful
    //like run code but if a resource is missing or somethings out of place then it wont run, and will instead throw an error
    //whereas maybe if you dont use try catch and you run some code, it could break, or do something it's not supposed to
    //so with try catch its much safer, you wont get unexpected error, i think that's it
    // try {
    //     console.log(req.body);
    // } catch (err) {
    //     console.log(err.message);
    // }

    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }

});

//get all todos
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message)
    }
});

//get a (single/specific) todo
app.get("/todos/:id", async(req, res) => { 
    try {
        //console.log(req.params);
        const { id } = req.params; 
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [id]
         );
        
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2", 
            [description, id]
        );
        //res.json(updateTodo.rows[0]); //this is what I thought it would be
        res.json("Todo was updated!"); //but the video did this instead
    } catch (err) {
        console.error(err.message);
    }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        //res.json(deleteTodo.rows[0]);
        res.json("Todo was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("Dude! Server has started on port 5000");
});