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

        const reducer = (state, action) => (state + action)

        const schemaReducer = createSchemaReducer(Runtypes.Number, reducer)

        expect(schemaReducer(initialState, 0)).toBe(initialState)
    })

    test('it should throw when the reduced state doesn\'t match the schema', () => {
        const initialState = 5

        const reducer = (state, action) => 'invalid state'

        const schemaReducer = createSchemaReducer(Runtypes.Number, reducer)

        expect(() => schemaReducer(initialState, 0)).toThrow()
    })
})
