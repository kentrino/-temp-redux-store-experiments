import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState, rootReducer } from 'app/reducers';
import { logger, thunk } from 'app/middleware';
import { TodoActions } from 'app/actions';

export function configureStore(initialState?: RootState): Store<RootState> {
  let middleware = applyMiddleware(thunk, logger);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer as any, initialState as any, middleware) as Store<RootState>;

  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const nextReducer = require('app/reducers');
      store.replaceReducer(nextReducer);
    });
  }
  console.log("最初の状態", store.getState())
  store.dispatch(TodoActions.addTodo({ text: "hoge" }))
  console.log("次の状態", store.getState())
  store.dispatch(TodoActions.addTodo({ text: "fuga" }))
  console.log("さらに次の状態", store.getState())
  return store;
}
