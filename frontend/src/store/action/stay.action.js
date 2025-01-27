import { stayService } from "../../services/stay.service"

export function loadStays(filter) {
  return async (dispatch) => {
    try {
      const stays = await stayService.query(filter)
      const action = {
        type: "SET_STAYS",
        stays,
      }
      dispatch(action)
    } catch (err) {
      console.error(err)
    }
  }
}


export function setStays(stays) {
  return (dispatch) => {
    const action = {
      type: "SET_STAYS",
      stays,
    }
    dispatch(action)
  }
}
