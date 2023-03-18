import { HandPalm, Play } from 'phosphor-react'
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from './styles'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

const newCycleFormValidationForm = zod.object({
  task: zod.string().nonempty(),
  minutesAmount: zod.number().min(1).max(60).int(),
})

type NewCycleFormValidationForm = zod.infer<typeof newCycleFormValidationForm>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startedAt: Date
  interruptedAt?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const { register, handleSubmit, watch, reset } =
    useForm<NewCycleFormValidationForm>({
      resolver: zodResolver(newCycleFormValidationForm),
      defaultValues: {
        task: '',
        minutesAmount: 0,
      },
    })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    document.title = `${minutes}:${seconds} - Pomodoro`
  }, [minutes, seconds])

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startedAt,
        )
        if (secondsDifference >= totalSeconds) {
          setCycles(
            cycles.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return {
                  ...cycle,
                  finishedDate: new Date(),
                }
              } else {
                return cycle
              }
            }),
          )
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])
  function handleInterruptCycle() {
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedAt: new Date(),
          }
        }
        return cycle
      }),
    )
    setActiveCycleId(null)
  }
  function handleCreateNewCycle(data: NewCycleFormValidationForm) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    }
    console.log(newCycle)
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    reset()
  }
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
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

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>
        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type={'button'}>
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
