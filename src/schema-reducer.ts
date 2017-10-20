const schemaReducer = (schema, reducer) => (currentState, action) => {
    const state = reducer(currentState, action)

    schema.check(state)

    return state
}

export default schemaReducer