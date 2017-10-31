# Redux Schema via Runtypes

```
.______    _______  _______   __    __  ___   ___     _____.  ______  __    __   _______ .___  ___.      ___
|   _  \  |   ____||       \ |  |  |  | \  \ /  /    /     | /      ||  |  |  | |   ____||   \/   |     /   \
|  |_)  | |  |__   |  .--.  ||  |  |  |  \  V  /    |   (--`|  ,----'|  |__|  | |  |__   |  \  /  |    /  ^  \
|      /  |   __|  |  |  |  ||  |  |  |   >   <      \   \  |  |     |   __   | |   __|  |  |\/|  |   /  /_\  \
|  |\  \-.|  |____ |  '--'  ||  `--'  |  /  .  \   .--)   | |  `----.|  |  |  | |  |____ |  |  |  |  /  _____  \
| _| `.__||_______||_______/  \______/  /__/ \__\  |_____/   \______||__|  |__| |_______||__|  |__| /__/     \__\

```

[![NPM](https://nodei.co/npm/redux-runtypes-schema.png?downloads=true&stars=true)](https://nodei.co/npm/redux-runtypes-schema/)

[![CircleCI](https://circleci.com/gh/mobify/redux-runtypes-schema.svg?style=svg)](https://circleci.com/gh/mobify/redux-runtypes-schema)

## Introduction

This library provides a reducer that enables full Redux store validation against
a known schema defined using the [runtypes](https://github.com/pelotom/runtypes)
library.

Inspiration for this library is based on the article [*Redux and JSON Schema -
Two great tastes that go great
together*](https://blog.prismatik.com.au/redux-and-json-schema-c63368931143).

A common issue with Redux is understanding what your stores schema is (or should
be) as your application grows. Running the app and inspecting the store using
the Redux dev tools is great for development but is not foolproof, as different
reducers may modify the store in inconsistent ways and leave your store in an
unexpected state.

This library runs the state returned from the root reducer through runtype
validation as a final step. This means that if you dispatch an action and the
reducer modifies the store in a way that doesn't match your intended schema,
you'll get a validation warning in your console.

## Requirements

* node v8+
* npm v3+

## Owner

`redux-runtypes-schema` is an open source library developed by
[Mobify](www.mobify.com).

## Usage

Using `redux-runtypes-schema` is as easy as passing the root reducer and
a runtype definition to the `createSchemaReducer` function and using
that to create your Redux store.

```js
import createSchemaReducer from 'redux-runtypes-schema'
import Runtypes from 'runtypes'

const Schema = Runtypes.Record({
    // Schema defined here using the runtypes library
})

// Set up project reducer(s)
const rootReducer = combineReducers({
    // all top-level keys for project defined here.
})

// Wrap project reducer in schema reducer
const reducer = createSchemaReducer(
    Schema,
    combineReducers(reducers)
)

const store = createStore(reducer)

// TODO: Launch app (render react app with <Provider store={store}>
```

## Developing

### Setup

First, get set up to build, test, and run the library:

```sh
$ npm install
```

`redux-runtypes-schema` is written using TypeScript and built using Rollup.
These are both new technologies to Mobify and would be considered to be in
the "evaluate" stage of a "technology radar" a la [ThoughtWorks](https://www.thoughtworks.com/radar)..

### Running tests

Run all tests with:

```sh
$ npm test
```

Start [jest](https://facebook.github.io/jest/) (the testing tool) in "watch"
by running:

```sh
$ npm run test:watch
```

This will start jest and watch for file changes. Any time you change a file
and save it, jest will automatically re-run affected tests. This is a very
efficient way to develop changes/bugfixes for the library.
