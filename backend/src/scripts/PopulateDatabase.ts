import { Article, ArticleModel } from '../models/ArticleModel'
import fetch from 'cross-fetch'

const SPACE_FLIGHT_NEWS_API_URL = 'https://api.spaceflightnewsapi.net/v3/articles'

export class PopulateDatabase {

    async exec() {
        try {
            const persistedArticles = (await ArticleModel.find()).length

            if (persistedArticles > 0) {
                console.log('Database already populated.')
                return
            }

            const countResponse = await fetch(`${SPACE_FLIGHT_NEWS_API_URL}/count`)
            
            if (countResponse.status >= 400) {
                throw new Error("Bad response from server when requesting article count.")
            }
            
            let articlesToBeSaved = await countResponse.json()
            const totalArticles = articlesToBeSaved

            const articlesResponse = await fetch(`${SPACE_FLIGHT_NEWS_API_URL}?_limit=${articlesToBeSaved}`)

            if (articlesResponse.status >= 400) {
                throw new Error("Bad response from server when requesting articles data.")
            }

            const articles = await articlesResponse.json()

            await articles.map(async (article: Article) => {
                await ArticleModel.create({
                    id: article.id,
                    title: article.title,
                    url: article.url,
                    imageUrl: article.imageUrl,
                    newsSite: article.newsSite,
                    summary: article.summary,
                    publishedAt: article.publishedAt,
                })

                articlesToBeSaved--

                if (articlesToBeSaved === 0) {
                    console.log(`Database successfully populated. ${totalArticles} articles were inserted.`)
                }
            })
        } catch(error) {
            console.error(error)
        }
    }
}