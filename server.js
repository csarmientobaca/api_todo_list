require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const todoRoutes = require("./routes/todoRoutes");
//firebase routes
const authfirebaseRoutes = require("./routes/authfirebaseRoute.js");

//swagger docs
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");


app.use(cors()); 
app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.USERNAME_MONGO}:${process.env.PASS_MONGO}@todoapp.eo7ud.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=todoApp`
        );
        console.log("Connected to MongoDB Atlas!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // exit
    }
};
connectDB();

app.use("/auth", authfirebaseRoutes); 
app.use("/todos", todoRoutes);

//LETS GOO
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log(`Swagger Docs available at http://localhost:${process.env.PORT}/api-docs`);
});