import * as React from 'react'
import { useContext } from 'react'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../contexts/CyclesContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()
  return (
    <FormContainer>
      <label htmlFor={'task'}>Vou trabalhar em</label>
      <TaskInput
        list='taskList'
        placeholder={'Digite o que você vai fazer'}
        id={'task'}
        disabled={!!activeCycle}
        {...register('task')}
      />
      <datalist id='taskList'>
        <option value='Estudar React' />
        <option value='Estudar Next' />
        <option value='Estudar Styled Components' />
        <option value='Estudar Typescript' />
        <option value='Estudar React Query' />
        <option value='Estudar React Hook Form' />
        <option value='Estudar React Router' />
      </datalist>
      <label htmlFor={'minutesAmount'}>durante</label>
      <MinutesAmountInput
        placeholder={'00'}
        type='number'
        id='minutesAmount'
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
