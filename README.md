# Redux Schema via Runtypes

This library provides a reducer that allows you to verify your entire Redux
store against a known schema defined using the
[runtypes](https://github.com/pelotom/runtypes) library.

A common issue with Redux is understanding what your stores schema is (or should
be) as your application grows. Running the app and inspecting the store using
the Redux dev tools is great for development but is not foolproof as different
action reducers may modify the store differently and leave your store in an
unexpected state.

This library runs the final store state through runtype validation as a final
step. This means that if you dispatch an action and the reducer modifies the
store in a way that doesn't match your intended schema, you'll get a validation
warning in your console.

## Usage

```js
import {schemaReducer} from 'redux-runtypes-schema'
import Runtypes from 'runtypes'

const Schema = Runtypes.Record({
    // Schema defined here using runtypes records and types
})

// Set up project reducer(s)
const rootReducer = combineReducers({
    // all top-level keys for project defined here.
})

// Wrap project reducer in schema reducer
const reducer = schemaReducer(
    Schema,
    combineReducers(reducers)
)

const store = createStore(reducer)

// TODO: Launch app (render react app with <Provider store={store}>
```