import {combineReducers} from 'redux'

import countryReducer from './CountryReducer'
import uiReducer from './UiReducer'

const rootReducer = () =>
  combineReducers({
    countryReducer,
    uiReducer,
  })

export default rootReducer