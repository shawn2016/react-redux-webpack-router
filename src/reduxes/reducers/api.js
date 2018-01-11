import {
  APISUCCESS,
  APIFAIL,
  APICLEAR,
} from 'reduxes/constants'

const initState = {}
export default (state = initState, action) => {
  switch (action.type) {
    case APISUCCESS:

      return {
        ...state,
        [action.saveAs]: action.data.body,
      }
    case APIFAIL:
      return APIFAIL
    case APICLEAR:
      return APICLEAR
    default:
      return state
  }
}