import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle } from '../Pages/Home/types/new-cycle-form'
import { cyclesReducers } from '../reducers/cycles/cycles'
import {
  addNewCycleAction,
  finishCycleAction,
  interruptCycleAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface CyclesContextProviderProps {
  children: ReactNode
}
interface CreateCycleData {
  task: string
  minutesAmount: number
}
interface CyclesContextProps {
  cycles: Cycle[]
  activeCycle?: Cycle
  activeCycleId?: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (secondsPassed: number) => void

  createNewCycle: (data: CreateCycleData) => void
  interruptCycle: () => void
}
export const CyclesContext = createContext<CyclesContextProps>(
  {} as CyclesContextProps,
)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducers,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const stateJSON = localStorage.getItem(
        '@ignite-timer: cycles-state-1.0.0',
      )
      return stateJSON
        ? JSON.parse(stateJSON)
        : { cycles: [], activeCycleId: null }
    },
  )

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer: cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    const activeCycle = cyclesState.cycles.find(
      (cycle) => cycle.id === cyclesState.activeCycleId,
    )
    if (!activeCycle) return 0
    return differenceInSeconds(new Date(), new Date(activeCycle.startedAt))
  })
  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles?.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    dispatch(finishCycleAction())
  }
  function setSecondsPassed(secondsPassed: number) {
    setAmountSecondsPassed(secondsPassed)
  }
  function interruptCycle() {
    dispatch(interruptCycleAction())
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        activeCycle,
        setSecondsPassed,
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
