import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { Countdown } from './CountDown'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod'
import { NewCycleForm } from './NewCycleForm'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormValidationForm = zod.object({
  task: zod.string().nonempty(),
  minutesAmount: zod.number().min(1).max(60).int(),
})
export function Home() {
  type NewCycleFormValidationForm = zod.infer<typeof newCycleFormValidationForm>

  const newCycleForm = useForm<NewCycleFormValidationForm>({
    resolver: zodResolver(newCycleFormValidationForm),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, reset, watch } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormValidationForm) {
    createNewCycle(data)
    reset()
  }

  const { activeCycle, interruptCycle, createNewCycle } =
    useContext(CyclesContext)
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopCountdownButton onClick={interruptCycle} type={'button'}>
            <HandPalm size={24} />
            Pausar
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={!watch('task')} type={'submit'}>
            <Play size={24} />
            Iniciar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
