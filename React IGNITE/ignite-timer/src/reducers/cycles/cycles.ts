import { Cycle } from '../../Pages/Home/types/new-cycle-form'
import produce from 'immer'

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}
export enum ActionTypes {
  ADD_CYCLE = 'ADD_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  FINISH_CYCLE = 'FINISH_CYCLE',
}
export function cyclesReducers(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload)
        draft.activeCycleId = action.payload.id
      })
    case ActionTypes.INTERRUPT_CYCLE: {
      const cycle = state.cycles.find(
        (cycle) => cycle.id === state.activeCycleId,
      )
      if (!cycle) {
        return state
      }
      return produce(state, (draft) => {
        draft.activeCycleId = null
        cycle.interruptedAt = new Date()
      })
    }
    case ActionTypes.FINISH_CYCLE: {
      const cycle = state.cycles.find(
        (cycle) => cycle.id === state.activeCycleId,
      )
      if (!cycle) {
        return state
      }
      return produce(state, (draft) => {
        draft.activeCycleId = null
        cycle.finishedDate = new Date()
      })
    }
    default:
      return state
  }
}
