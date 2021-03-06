/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {AnyAction, Reducer} from 'redux'

export type State = any

export interface Runtype {
    check: (state: State) => void
}

export interface CreateSchemaOptions {
    /**
     * Causes schema validation to JSON serialize/deserialize
     * the state before schema validation. This is useful if
     * the final state is composed of non-standard javascript
     * objects (such as Immutable.js).
     *
     * The runtypes library currently only understands plain
     * javascript objects.
     */
    snapshotState?: Boolean
}

/**
 * Creates a new reducer that type-checks the given reducer's resulting state
 * against the given schema.
 * @param schema a `runtypes` object definition
 * @param reducer the reducer to wrap
 */
const createSchemaReducer = (schema: Runtype, reducer: Reducer<State>, options: CreateSchemaOptions = {}) => {
    if (!schema.check) {
        throw new TypeError('\'schema\' passed to schema reducer isn\'t an instance of a runtypes object.')
    }

    return (currentState: State, action: AnyAction): State => {
        const state = reducer(currentState, action)

        const stateToValidate = options.snapshotState
            ? JSON.parse(JSON.stringify(state))
            : state

        schema.check(stateToValidate)

        return state
    }
}

export default createSchemaReducer
