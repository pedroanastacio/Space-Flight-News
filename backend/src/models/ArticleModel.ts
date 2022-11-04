import { prop, getModelForClass } from '@typegoose/typegoose'

export class Article {
    @prop()
    public id?: number

    @prop()
    public title!: string

    @prop()
    public url!: string

    @prop()
    public imageUrl!: string

    @prop()
    public summary!: string

    @prop()
    public newsSite!: string

    @prop()
    public publishedAt!: string
}

export const ArticleModel = getModelForClass(Article)