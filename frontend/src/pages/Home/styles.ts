import styled from 'styled-components'

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  max-width: 1120px;
  padding: 2rem;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    margin-top: 3.5rem;

    img {
      width: 100%;
      max-width: 100px;
      height: auto;
    }

    h1 {
      font-weight: 400;
      color: ${(props) => props.theme['blue-500']};
    }
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    margin: 0 auto;
    margin-top: 3.5rem;
    border-top: 2px solid ${(props) => props.theme['gray-600']};
    padding-top: 3.5rem;

    ul {
      width: 100%;
      max-width: 800px;
    }

    > svg {
      color: ${(props) => props.theme['gray-500']};
    }

    > p {
      margin-top: 1rem;
      color: ${(props) => props.theme['gray-500']};
      font-size: 1.2rem;
    }
  }
`

export const HomeHeader = styled.header`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 0.5rem;

  input {
    width: 100%;
    max-width: 250px;
  }

  input,
  select {
    height: 40px;
    padding: 0 0.5rem;
    background: ${(props) => props.theme['gray-900']};
    border: 2px solid ${(props) => props.theme['gray-600']};
    border-radius: 4px;
    color: ${(props) => props.theme['gray-100']};
  }

  @media only screen and (min-width: 330px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
  }
`

export const MoreArticlesButton = styled.button`
  margin: 3.5rem auto 0;
  width: fit-content;
  padding: 0.5rem 1rem;
  border: 0;
  border-radius: 4px;
  background: ${(props) => props.theme['blue-500']};
  color: ${(props) => props.theme['gray-100']};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transition: opacity 0.2s;
  }
`

export const ScrollToTopButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  position: fixed;
  border: 0;
  bottom: 1rem;
  right: 1rem;
  border-radius: 999px;
  background-color: ${(props) => props.theme['orange-500']};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transition: opacity 0.2s;
  }
`
