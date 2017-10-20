const a = (currentState, action) => {
    if (!currentState) {
        return 'aaa'
    }

    switch (action.type) {
        case 'AA':
            return action.payload.a
        default:
            return currentState
    }
}

const b = (currentState, action) => {
    if (!currentState) {
        return 'bbb'
    }

    switch (action.type) {
        case 'BB':
            return action.payload.b
        default:
            return currentState
    }
}

export default {
    a,
    b
}