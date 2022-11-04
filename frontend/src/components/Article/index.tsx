import { ArticleContainer, NewsSite, PublishedDate } from './styles'

interface ArticleProps {
  article: {
    id: number
    title: string
    url: string
    imageUrl: string
    summary: string
    newsSite: string
    publishedAt: string
  }
  index: number
}

export function Article({ article, index }: ArticleProps) {
  return (
    <ArticleContainer index={index}>
      <img src={article.imageUrl} alt="" />

      <article>
        <header>
          <h2>{article.title}</h2>

          <div>
            <PublishedDate>
              {new Intl.DateTimeFormat('pt-BR').format(
                new Date(article.publishedAt),
              )}
            </PublishedDate>

            <NewsSite>{article.newsSite}</NewsSite>
          </div>
        </header>

        <p>{article.summary}</p>

        <a href={article.url} target="_blank" rel="noreferrer">
          Ver mais
        </a>
      </article>
    </ArticleContainer>
  )
}
