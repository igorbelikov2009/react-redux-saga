import { applyMiddleware, combineReducers, createStore } from "redux";
import countReducer from "./countReducer";
import userReducer from "./userReducer";
import createSagaMiddleware from "@redux-saga/core";
// import { countWatcher } from "../saga/countSaga";
import { rootWatcher } from "../saga";

// создаём sagaMiddleware, вызывая createSagaMiddleware()
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  countReducer,
  userReducer,
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// запускаем sagaMiddleware c глобальныv вотчер rootWatcher(),
// который наблюдает за двумя вотчерами countWatcher() и userWatcher()
sagaMiddleware.run(rootWatcher);
// ещё раз: создаём sagaMiddleware, запускаем его.run, передаём параметром
// глобальный вотчер (rootWatcher),
// вотчер у нас следит за конкретным экшеном с конкретным типом, и теперь этот экшен
// будем вызывать при нажатии на кнопку в App
