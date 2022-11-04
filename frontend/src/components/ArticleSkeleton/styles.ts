import styled from 'styled-components'

interface ArticleSkeletonContainerProps {
  index: number
}

export const ArticleSkeletonContainer = styled.li<ArticleSkeletonContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  & + li {
    margin-top: 4rem;
  }

  @media only screen and (min-width: 768px) {
    display: flex;
    flex-direction: ${(props) =>
      props.index % 2 === 0 ? 'row' : 'row-reverse'};
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    width: 100%;

    span {
      width: 100%;
    }
  }
`
