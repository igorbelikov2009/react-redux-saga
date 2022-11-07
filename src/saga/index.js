// Глобальный вотчер, который следит за другими вотчерами.
// Своего рода - комбайн-редюсе.
// Объединяет несколько вотчеров

import { all } from "redux-saga/effects";
import { countWatcher } from "./countSaga";
import { userWatcher } from "./userSaga";

export function* rootWatcher() {
  // вызываем функцию all. Туда передаём массив вотчеров
  yield all([countWatcher(), userWatcher()]);
}

// теперь этот глобальный вотчер rootWatcher() наблюдает за двумя вотчерами
// и передаём его в функцию run
