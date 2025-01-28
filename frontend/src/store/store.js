import { userReducer } from "./reducer/user.reducer.js"
import thunk from "redux-thunk"
import { createStore, applyMiddleware, combineReducers, compose } from "redux"

const rootReducer = combineReducers({
  userModule: userReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)
