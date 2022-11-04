import { Article, ArticleModel } from '../models/ArticleModel'
import { CronJob } from 'cron'
import fetch from 'cross-fetch'

const SPACE_FLIGHT_NEWS_API_URL = 'https://api.spaceflightnewsapi.net/v3/articles'

export const CronNewArticlesJob = new CronJob('0 0 9 * * *', async () => {
    try {
        const newestSpaceFlightApiArticleResponse = await fetch(`${SPACE_FLIGHT_NEWS_API_URL}?_limit=1`)

        if (newestSpaceFlightApiArticleResponse.status >= 400) {
            throw new Error("Bad response from server when requesting newest article.")
        }

        const [ newestSpaceFlightApiArticle ] = await newestSpaceFlightApiArticleResponse.json()

        const [ newestSavedArticle ] = await ArticleModel.find().sort({ id: -1 }).limit(1)

        if (newestSavedArticle.id >= newestSpaceFlightApiArticle.id) {
            console.log('No new articles to save.')
            return
        }

        const newestsSpaceFlightApiArticlesResponse = await fetch(`${SPACE_FLIGHT_NEWS_API_URL}?id_gt=${newestSavedArticle.id}`)
        
        if (newestsSpaceFlightApiArticlesResponse.status >= 400) {
            throw new Error("Bad response from server when requesting newests articles.")
        }

        const newestsArticles = await newestsSpaceFlightApiArticlesResponse.json()
        let newestsArticlesToBeSaved = newestsArticles.length
        let totalNewestsArticles = newestsArticlesToBeSaved
        
        await newestsArticles.map(async (article: Article) => {
            await ArticleModel.create({
                id: article.id,
                title: article.title,
                url: article.url,
                imageUrl: article.imageUrl,
                newsSite: article.newsSite,
                summary: article.summary,
                publishedAt: article.publishedAt,
            })

            newestsArticlesToBeSaved--
            
            if(newestsArticlesToBeSaved === 0) {
                console.log(`Database successfully updated. ${totalNewestsArticles} new article(s) were inserted.`)
            }
        })  
    } catch (error) {
        console.error(error)
    }
})



