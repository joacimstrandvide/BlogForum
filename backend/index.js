// Importerar dotenv för att gömma känsliga nycklar
import * as dotenv from 'dotenv'
//implementerar dotenv
dotenv.config()
// Express
import express from 'express'
// Hämtar CORS
import cors from 'cors'
//Hämtar postgress sql
import pg from 'pg'
//Hämtar client paket så att kommunikationen mellan server och databas fungerar
import pkg from 'pg'
const { Client } = pkg
//Hämtar body-parser (ett middlewear som kan hantera olika request metoder)
import bodyParser from 'body-parser'
//Importerar path spom gör att vi kan använda statiska filier på valfri plats i vårt projekt
import path from 'path'
//Implemenetrar Express tillsammans med app
const app = express()
//lägger till middlewear
//Bodyparser

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

//Cors

app.use(cors())

//express

app.use(express.json())

// Förbättrar cors kommunikation

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Headers', 'Content-Type')

    next()
})

// Använder path för att komma åt våra statiska filer, i detta fallet i vår public mapp i vår front-end

app.use(express.static(path.join(path.resolve(), 'public')))

//Importerar min databas

const db = new Client({
    host: process.env.DB_HOST,

    user: process.env.DB_USERNAME,

    password: process.env.DB_PASSWORD,

    databas: process.env.DB_NAME,

    port: process.env.DB_PORT
})

//Errorfunktion

db.connect(function (err) {
    if (err) throw err

    console.log('Connected to database')
})

//Routes
app.get('/', (req, res) => {
    res.json('Root')
})

//GET
app.get('/blogs', async (req, res) => {
    try {
        const allPosts = await db.query('SELECT * FROM posts')
        res.json(allPosts.rows)
    } catch (err) {
        console.log(err.message)
    }
})

//POST
app.post('/blogs', async (req, res) => {
    const { title, text, author } = req.body
    const values = [title, text, author]
    await db.query(
        'INSERT INTO posts(title, text, author) VALUES($1, $2, $3)',
        values
    )
    res.send('Blog Post added')
})

//Delete
app.delete('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletePost = await db.query('DELETE FROM posts WHERE id = $1', [
            id
        ])
        res.json({ message: 'Blog Post Deleted' })
    } catch (err) {
        console.log(err.message)
    }
})

//PUT
app.put('/blogs/:id', async (req, res) => {
    const id = req.params.id
    const { title, text, author } = req.body
    const values = [title, text, author, id]
    await db.query(
        'UPDATE posts SET title = $1, text = $2, author = $3 WHERE id = $4',
        values
    )
    res.send("Post is changed")
})

//Gör så att servern dras igång och lyssnar
app.listen(8900, () => {
    console.log('Server is running')
})
