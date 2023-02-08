const express = require('express');
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        // Student
        app.post('/student',async (req, res)=>{
            const student = req.body;
            const result = await students.insertOne(student)
            res.send(result)
        })

        app.get('/students', async (req, res)=>{
            const query = {};
            const cursor = students.find(query);
            const all_students = await cursor.toArray()
            res.send(all_students)
        })

        app.put('/student/:id', (res, req)=>{
            console.log(req.params.id)
            res.send()
        })

        app.delete('/student/:id',async (res, req)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await students.deleteOne(query)
            res.send(result)
        })

        app.get('/student/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = students.findOne(query)
            console.log(result)
            res.send(result)
        })

        // Teacher
        app.post('/teacher',async (req, res)=>{
            const teacher = req.body;
            const result = await teachers.insertOne(teacher)
            res.send(result)
        })

        app.get('/teachers',async (req, res)=>{
            const query = {};
            const cursor = teachers.find(query);
            const all_teachers = await cursor.toArray()
            res.send(all_teachers)
        })

        // department
        app.post('/department',async (req, res)=>{
            const department = req.body;
            const result = await departments.insertOne(department)
            res.send(result)
        })

        app.get('/departments',async (req, res)=>{
            const query = {};
            const cursor = departments.find(query);
            const all_departments = await cursor.toArray()
            res.send(all_departments)
        })

        // subjects
        app.post('/subject',async (req, res)=>{
            const subject = req.body;
            const result = await subjects.insertOne(subject)
            res.send(result)
        })

        app.get('/subjects',async (req, res)=>{
            const query = {};
            const cursor = subjects.find(query);
            const all_subjects = await cursor.toArray()
            res.send(all_subjects)
        })

        // books
        app.post('/book',async (req, res)=>{
            const book = req.body;
            const result = await books.insertOne(book)
            res.send(result)
        })

        app.get('/books',async (req, res)=>{
            const query = {};
            const cursor = books.find(query);
            const all_books = await cursor.toArray()
            res.send(all_books)
        })

        // blogs
        app.post('/blog',async (req, res)=>{
            const blog = req.body;
            const result = await blogs.insertOne(blog)
            res.send(result)
        })

        app.get('/blogs',async (req, res)=>{
            const query = {};
            const cursor = blogs.find(query);
            const all_blogs = await cursor.toArray()
            res.send(all_blogs)
        })
    }
    finally{}
}
run().catch(console.dir)


app.listen(port, ()=>{
    console.log('Success')
})