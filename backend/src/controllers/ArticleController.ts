import { Request, Response } from 'express'
import { ArticleModel } from '../models/ArticleModel'

export class ArticleController {

    async find(req: Request, res: Response) {
        const { _page, _sort, _limit, title_contains} = req.query

        const sort = _sort === ('asc' || 'desc') ? _sort : 'desc'
        const page = _page ? (isNaN(Number(_page)) ? 1 : Number(_page)) : 1
        const titleContains = title_contains
        const limit = _limit ? (isNaN(Number(_limit)) ? 10 : Number(_limit)) : 10
        const skip = limit * ((page > 0 ? page : 1) - 1)

        let articles = []

        if(!titleContains) {
            articles = await ArticleModel.find()
                .sort({ publishedAt: sort })
                .skip(skip)
                .limit(limit)
        } else {
            articles = await ArticleModel.find({ title: { $regex: titleContains, $options: 'i' }})
            .sort({ publishedAt: sort })
            .skip(skip)
            .limit(limit)
        }
        
        return res.status(200).json(articles)
    }
    
    async findOne(req: Request, res: Response) {
        const { id } = req.params

        const article = await ArticleModel.findOne({ id })

        if(!article) {
            return res.status(404).json({ message: 'Article not found.' })
        }

        return res.status(200).json(article)
    }
}