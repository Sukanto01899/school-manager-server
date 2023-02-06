const express = require('express');
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express()

app.use(cors())
app.use(express.json())


// Replace the uri string with your MongoDB deployment's connection string.
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hcglgi5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const database = client.db('school-manager');
        const students = database.collection('students');
        const teachers = database.collection('teachers');
        const departments = database.collection('departments');
        const subjects = database.collection('subjects');
        const books = database.collection('books');
        const blogs = database.collection('blogs');

        app.post('/student',async (req, res)=>{
            const student = req.body;
            const result = await students.insertOne(student)
            console.log(result)
            res.send(result)
        })

        app.get('/students', async (req, res)=>{
            const query = {};
            const cursor = students.find(query);
            const all_students = await cursor.toArray()
            res.send(all_students)
        })
    }
    finally{}
}
run().catch(console.dir)


app.listen(port, ()=>{
    console.log('Success')
})