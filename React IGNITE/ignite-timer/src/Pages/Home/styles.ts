import styled from 'styled-components'

export const HomeContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme['gray-100']};
  font-weight: bold;
  flex-wrap: wrap;
  font-size: 1.125rem;
`

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
export const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: ${({ theme }) => theme['green-500']};
  color: ${({ theme }) => theme['gray-100']};
  gap: 0.5rem;
  font-weight: bold;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  &:not(:disabled):hover {
    background: ${({ theme }) => theme['green-700']};
  }
`
export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${({ theme }) => theme['green-500']};
  color: ${({ theme }) => theme['gray-100']};
`
export const StopCountdownButton = styled(BaseCountdownButton)`
  border-radius: 8px;
  background: ${({ theme }) => theme['red-500']};

  &:not(:disabled):hover {
    background: ${({ theme }) => theme['red-700']};
  }
`

export const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${({ theme }) => theme['gray-500']};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;

  &:focus {
    border-bottom: 2px solid ${({ theme }) => theme['green-500']};
    box-shadow: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme['gray-500']};
  }
`
export const TaskInput = styled(BaseInput)`
  flex: 1;
`
export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`
