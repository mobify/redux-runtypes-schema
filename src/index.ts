import {createStore, combineReducers} from 'redux'
import reducers from './reducers'
import schemaReducer from './schema-reducer'
import Schema from './schema'

const reducer = schemaReducer(
    Schema,
    combineReducers(reducers)
)

const store = createStore(reducer)

console.log('1', store.getState())

store.dispatch({
    type: 'AA',
    payload: { a: 'zzz' }
})

console.log('2', store.getState())

store.dispatch({
    type: 'BB',
    payload: { b: {} }
})

console.log('3', store.getState())
