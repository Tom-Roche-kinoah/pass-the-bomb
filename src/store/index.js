import {
  createStore,
  // applyMiddleware,
  compose,
} from 'redux';

import reducer from 'src/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const enhancers = composeEnhancers(
//   applyMiddleware(
//     unMiddleware,
//     unAutreMiddleware,
//   ),
// );

const enhancers = composeEnhancers();

const store = createStore(
  reducer,
  enhancers,
);

export default store;
