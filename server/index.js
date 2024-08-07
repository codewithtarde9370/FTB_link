import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { getLinks, getRedirectSlug, postlink, deleteLink } from './controllers/Link.js';
import { postLogin, postSignup } from './controllers/User.js';

dotenv.config();

const app = express()
app.use(express.json())
app.use(cors())

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URL)

    if (conn){
        console.log('MongoDB Connected');
    }
    else {
        console.log('Failure in connection')
    }
}
connectDB();

app.get('/health',(req, res) => {
    res.json({
        success : true,
        message : "server is working successfully!!!"
    })
})
app.post("/signup",postSignup)
app.post("/login", postLogin)
app.post('/link',postlink)
app.get('/links', getLinks)
app.get("/:slug",getRedirectSlug)
app.delete("/link/:id",deleteLink)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})