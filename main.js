import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { helloSaga } from './sagas'
import Counter from './Counter'
import reducer from './reducers'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(helloSaga)

const action = (type) => store.dispatch({ type })

function render() {
	ReactDOM.render(
		<Counter
			value={store.getState()}
			onIncrement={() => action('INCREMENT')}
			onDecrement={() => action('DECREMENT')}
		/>,
		document.getElementById('root')
	)
}

render()
store.subscribe(render)
