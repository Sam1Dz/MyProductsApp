import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

import rootReducers from './reducers';

const logger = createLogger({});

const store = createStore(
    rootReducers,
    applyMiddleware(
        logger,
        promiseMiddleware
    )
);

export default store;