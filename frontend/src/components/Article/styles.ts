import styled from 'styled-components'

interface ArticleContainerProps {
  index: number
}

export const ArticleContainer = styled.li<ArticleContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  & + li {
    margin-top: 4rem;
  }

  img {
    width: 100%;
    max-width: 350px;
    height: auto;
    object-fit: contain;
  }

  @media only screen and (min-width: 768px) {
    display: flex;
    flex-direction: ${(props) =>
      props.index % 2 === 0 ? 'row' : 'row-reverse'};

    img {
      width: 100%;
      max-width: 300px;
      height: auto;
      object-fit: contain;
    }
  }

  article {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    header {
      div {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-top: 0.5rem;
      }
    }

    > a {
      width: fit-content;
      padding: 0.5rem 1rem;
      text-decoration: none;
      border-radius: 4px;
      background: ${(props) => props.theme['blue-500']};
      color: ${(props) => props.theme['gray-100']};
      margin: 0 auto;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
        transition: opacity 0.2s;
      }

      @media only screen and (min-width: 768px) {
        margin: 0;
      }
    }
  }
`

export const PublishedDate = styled.span`
  font-size: 0.8rem;
  color: ${(props) => props.theme['gray-400']};
`

export const NewsSite = styled.span`
  color: ${(props) => props.theme['gray-900']};
  text-decoration: none;
  padding: 0.1rem 0.5rem;
  border-radius: 2px;
  background: ${(props) => props.theme['orange-500']};
`
