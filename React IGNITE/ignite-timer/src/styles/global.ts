import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    :focus{
        outline: 0;
      box-shadow: 0 0 0 2px ${({ theme }) => theme['green-500']}
    }
    body {
      font-family: 'Roboto', sans-serif;
      background: ${({ theme }) => theme['gray-900']};
      font-size: 1rem;
      font-weight: 400;
        color: ${({ theme }) => theme['gray-100']};
      -webkit-font-smoothing: antialiased;
    }
`
