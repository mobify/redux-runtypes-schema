/**
 * Creates a new reducer that type-checks the given reducer's resulting state
 * against the given schema.
 * @param schema a `runtypes` object definition
 * @param reducer the reducer to wrap
 */
const createSchemaReducer = (schema, reducer) => {
    if (!schema.check) {
        throw new TypeError('\'schema\' passed to schema reducer isn\'t an instance of a runtypes object.')
    }

    return (currentState, action) => {
        const state = reducer(currentState, action)

        schema.check(state)

        return state
    }
}

export default createSchemaReducer
