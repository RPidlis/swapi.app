import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import CharacterReducer from './CharacterReducer'

let reducer = combineReducers({
    character: CharacterReducer
})

let store = createStore(reducer, applyMiddleware(thunkMiddleware))

export default store