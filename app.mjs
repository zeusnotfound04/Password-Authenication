import express from "express";
import routes from "./Routes/index.mjs";
import mongoose from "mongoose";
const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.static("public"));
app.use(express.urlencoded({extended: false}))
app.set("view engine" , "ejs");

app.use(routes);
app.listen( PORT , console.log("Server is Running....."));