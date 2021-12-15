import { combineReducers } from 'redux'
import { playerSettingsReducer } from './playerSettingsReducer'
import { padReducer } from './padReducer'


export const rootReducer = combineReducers({
    playerSettingsReducer,
    padReducer
})
