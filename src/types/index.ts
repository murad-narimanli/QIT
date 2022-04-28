
import {CountryReducerState} from './CountryTypes'
import {UiReducerState} from './UiTypes'


export * from './CountryTypes'
export * from './UiTypes'


//global App state
export type AppState={
    countryReducer:CountryReducerState    
    uiReducer:UiReducerState
}