// IMPORT ALL THE DEPENDENCIES

    require("dotenv").config();

// pull PORT from .ENV give default value 
// Create a Database Creation 
    const {PORT = 8000, DATABASE_URL} = process.env

// import Express
    const express = require("express")

// create application object
    const app = express()

// IMPORT MONGOOSE:
    const mongoose = require('mongoose')

// Import cors
    const cors = require("cors")

// Import Morgan
    const morgan = require("morgan")

// DATABASE CONNECTION
// establish connection:
    mongoose.connect(DATABASE_URL)

// CONNECTION EVENTS:
    mongoose.connection
    .on("open", ()=>console.log("Connected to mongoose"))
    .on("close", ()=>(console.log("Disconnected")))
    .on("error", (error)=>(console.log(error)))

//  MODELS:
    const personSchema = new mongoose.Schema({
        name: String,
        image: String,
        title: String
    })
    
    const Person = mongoose.model("Person", personSchema)

//  MIDDLE WARE:
// cors for preventing cors error(ALlow req from other origin)
    app.use(cors())

//  morgan for logging request:
    app.use(morgan("dev"))

//  express functionality to recognize incoming request object as JSON Object:
    app.use(express.json())

//  Routes: INDUCES: INDEX, xNEWx, DELETE, UPDATE, CREATE, xEDITx,  

app.get("/person", async(req,res)=>{
    try{
    
        const people = await Person.find({})
        res.json(people)
    }
    catch (error){
        res.status(400).json({error})
    }
})

app.post("/person", async(req,res)=>{
    try{
      
        const person = await Person.create(req.body)
        res.json(person)
    }
    catch (error){
        res.status(400).json({error})
    }
})

// SHOW:- get:
app.get("/person/:id", async(req,res)=>{
    try{
        
        const person = await Person.findById(req.params.id)
        res.json(person)
    }
    catch (error){
        res.status(400).json({error})
    }
})

// Update- PUT:
app.put("/person/:id", async(req,res)=>{
    try{
    //    
        const person = await Person.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
        })
        res.json(person)
    }
    catch (error){
        res.status(400).json({error})
    }
})

// DESTROY - DETLETE:

app.delete("/person/:id", async(req,res)=>{
    try{
    //    
        const person = await Person.findByIdAndDelete(req.params.id)
        res.status(204).json(person)
    }
    catch (error){
        res.status(400).json({error})
    }
})



// // Create a test route:
app.get("/", (req,res)=>{
    res.json({hello:"World"})
})










// Listener:
app.listen(PORT, ()=>console.log(`Listening on PORT ${PORT}`))