interface Action {
    type: string,
    payload: any,
    [x: string]: any // Accepts _any_ other properties
}

type State = any
type Reducer = (state: State, action: Action) => State
interface Runtype {
    check: (state: State) => void
}

/**
 * Creates a new reducer that type-checks the given reducer's resulting state
 * against the given schema.
 * @param schema a `runtypes` object definition
 * @param reducer the reducer to wrap
 */
const createSchemaReducer = (schema: Runtype, reducer: Reducer) => {
    if (!schema.check) {
        throw new TypeError('\'schema\' passed to schema reducer isn\'t an instance of a runtypes object.')
    }

    return (currentState: State, action: Action): State => {
        const state = reducer(currentState, action)

        schema.check(state)

        return state
    }
}

export default createSchemaReducer
