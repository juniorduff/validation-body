import styled from 'styled-components'

export const CountDownContainer = styled.div`
  font-family: 'Roboto', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${({ theme }) => theme['gray-100']};
  display: flex;
  gap: 1rem;

  span {
    background-color: ${({ theme }) => theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`
export const Separator = styled.div`
  padding: 2rem 0;
  line-height: 8rem;
  color: ${({ theme }) => theme['green-500']};
  justify-content: center;
  width: 4rem;
  overflow: hidden;
  display: flex;
`
