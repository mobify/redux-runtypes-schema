/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest, node */
import * as Runtypes from 'runtypes'
import createSchemaReducer from './index'

describe('When creating the reducer', () => {
    test('it should return a reducer', () => {
        const reducer = createSchemaReducer(Runtypes.Number, (state, action) => {})
        expect(typeof reducer).toBe('function')
    })

    test('it should throw if schema is not a runtype object', () => {
        expect(() => {
            createSchemaReducer({}, (state, action) => {})
        }).toThrow()
    })
})

describe('When reducing an action', () => {
    test('it should return the reduced state unchanged when state doesn\'t match the schema', () => {
        const initialState = 5

        const reducer = (state, action) => (state + action.payload)

        const schemaReducer = createSchemaReducer(Runtypes.Number, reducer)

        expect(schemaReducer(initialState, {type: 'ADD', payload: 0})).toBe(initialState)
    })

    test('it should throw when the reduced state doesn\'t match the schema', () => {
        const initialState = 5

        const reducer = (state, action) => 'invalid state'

        const schemaReducer = createSchemaReducer(Runtypes.Number, reducer)

        expect(() => schemaReducer(initialState, 0)).toThrow()
    })

    test('it should snapshot state if the `snapshotState` option is `true`', () => {
        let statePassedToSchema

        const Schema = {
            check: (state) => {
                statePassedToSchema = state
            }
        }

        // Note that we don't mutate state here. All we're interested in
        // in this test is that the state we schema check is not the same
        // as our initial or final state.
        const reducer = (state, action) => state

        const initialState = {stuff: {name: 'Fred', age: 22}}

        const schemaReducer = createSchemaReducer(Schema, reducer, {snapshotState: true})

        const finalState = schemaReducer(initialState, {type: 'CHANGE_NAME'})

        expect(statePassedToSchema).not.toBe(initialState)
        expect(statePassedToSchema).not.toBe(finalState)
    })
})

