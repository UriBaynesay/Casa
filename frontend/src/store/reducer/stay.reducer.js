const initialState = {
  stays: null,
  filterBy: null,
}

export function stayReducer(state = initialState, action) {
  var newState = state
  switch (action.type) {
    case "SET_STAYS":
      newState = { ...state, stays: action.stays }
      break
    default:
  }
  return newState
}
