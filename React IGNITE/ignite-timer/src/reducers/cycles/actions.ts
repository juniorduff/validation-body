import { Cycle } from '../../Pages/Home/types/new-cycle-form'
import { ActionTypes } from './cycles'

export function addNewCycleAction(cycle: Cycle) {
  return {
    type: ActionTypes.ADD_CYCLE,
    payload: cycle,
  }
}

export function interruptCycleAction() {
  return { type: ActionTypes.INTERRUPT_CYCLE }
}
export function finishCycleAction() {
  return { type: ActionTypes.FINISH_CYCLE }
}
