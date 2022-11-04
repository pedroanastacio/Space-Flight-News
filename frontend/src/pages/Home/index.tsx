import { ArrowUp, FileX } from 'phosphor-react'
import { useEffect, useState, useCallback } from 'react'
import { Article } from '../../components/Article'
import { ArticleSkeleton } from '../../components/ArticleSkeleton'
import { api } from '../../lib/axios'

import {
  HomeContainer,
  HomeHeader,
  MoreArticlesButton,
  ScrollToTopButton,
} from './styles'

interface ArticleType {
  id: number
  title: string
  url: string
  imageUrl: string
  summary: string
  newsSite: string
  publishedAt: string
}

export function Home() {
  const [page, setPage] = useState<number>(1)
  const [sort, setSort] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [articles, setArticles] = useState<ArticleType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  function handleScrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const fetchMoreArticles = useCallback(async () => {
    const response = await api.get('/', {
      params: {
        _page: page + 1,
        _sort: sort,
        title_contains: search,
      },
    })

    if (response.data.length > 0) {
      setPage((state) => state + 1)
      setArticles((state) => [...state, ...response.data])
    }
  }, [page, search, sort])

  const fetchArticles = useCallback(async () => {
    const response = await api.get('/', {
      params: {
        _sort: sort,
        title_contains: search,
      },
    })

    setArticles(response.data)
    setPage(1)
    setLoading(false)
  }, [sort, search])

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  return (
    <HomeContainer>
      <HomeHeader>
        <input
          type="text"
          placeholder="Pesquisar"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          defaultValue="default"
          onChange={(event) => setSort(event.target.value)}
        >
          <option value="default" disabled hidden>
            Ordernar por
          </option>
          <option value="desc">Mais novas</option>
          <option value="asc">Mais antigas</option>
        </select>
      </HomeHeader>

      <div>
        <img src="/src/assets/snapi_logo.png" alt="Foguete" />
        <h1>Space Flight News</h1>
      </div>

      <main>
        {loading ? (
          <ul>
            {Array.from({ length: 3 }).map((_, index) => {
              return <ArticleSkeleton key={index} index={index} />
            })}
          </ul>
        ) : articles.length > 0 ? (
          <>
            <ul>
              {articles.map((article, index) => {
                return (
                  <Article
                    key={`article-${article.id}-${index}`}
                    article={article}
                    index={index}
                  />
                )
              })}
            </ul>

            <MoreArticlesButton onClick={fetchMoreArticles}>
              Carregar mais
            </MoreArticlesButton>
          </>
        ) : (
          <>
            <FileX size={48} />
            <p>Nenhum artigo encontrado</p>
          </>
        )}
      </main>

      <ScrollToTopButton onClick={handleScrollToTop}>
        <ArrowUp size={18} />
      </ScrollToTopButton>
    </HomeContainer>
  )
}
