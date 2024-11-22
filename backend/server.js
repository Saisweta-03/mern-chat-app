// const express = require("express");
// const dotenv = require("dotenv");
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import { connect } from "mongoose";
import connectToMongoDB from "./db/connectToMongoDB.js";

import { app, server } from './socket/socket.js'

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
dotenv.config();

app.use(express.json()); //to parse the incoming requests with json payloads (from req.body)

/* app.get("/", (req, res) => {
// root route http://localhost:5000/
   res.send("Hello World");
 });  */

/* app.get("/api/auth/signup" , (req,res) => {
   console.log("signup Route"); });
 app.get("/api/auth/login" ,(req,res) => {
   console.log("Login route"); });
 app.get("/api/auth/logout" , (req,res) => {
   console.log("Logout route"); });  */
app.use(cookieParser());
app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes);
app.use("/api/users" , userRoutes);
app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*" , (req,res) => {
  res.sendFile(path.join(__dirname, "frontend" , "dist " , "index.html"))
})

server.listen(PORT, () =>{
  connectToMongoDB();
  console.log(`Server Running on Port ${PORT}`)
});
