import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { MongoConnection } from './database/MongoConnection'
import { routes } from './router/routes'
import { PopulateDatabase } from './scripts/PopulateDatabase'
import { CronNewArticlesJob } from './scripts/CronNewArticles'


dotenv.config({ path: `.env.${process.env.NODE_ENV}`})

const PORT = process.env.NODE_PORT

const app = express()

app.use(cors())
app.use(express.json())

const db = new MongoConnection()
db.connect()

app.use(routes)

const populateDatabase = new PopulateDatabase()
populateDatabase.exec()

CronNewArticlesJob.start()

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))


