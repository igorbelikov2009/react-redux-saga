import { put, takeEvery } from "redux-saga/effects";
import { ASYNC_DECREMENT, ASYNC_INCREMENT, decrementCreator, incrementCreator } from "../store/countReducer";
// put - это своего рода dispatch, предназначен для асихронных экшенов, в которых нет никаких временных задержек

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* incrementWorker() {
  yield delay(1000); // выглядит это как asynk-await, то есть, следующий кусок
  // кода не выполнится, пока не выполнится это асинхронное действие
  yield put(incrementCreator()); // в put передаём экшен
  // на этом этапе, этот put не отработает до тех пор, пока не отработает delay
  // То есть будет задержка в 1 секунду, затем выполнится инкремент
}

export function* decrementWorker() {
  yield delay(1000);
  yield put(decrementCreator());
}

// Воркер готов и асинхронный increment у нас есть. Как заставить его работать? Для этого реализуем вотчер.
// Вотчер будет следить за тем, чтобы асинхронный код был выполнен. Для этого импортируем еффект takeEvvery()
export function* countWatcher() {
  // первым параметром передаём тип экшена, за которым необходимо следить
  // вторым параметром передаём воркер, который должен отрабатывать для экшен с таким типом, который мы передали первым параметром, будет задиспатчен
  yield takeEvery(ASYNC_INCREMENT, incrementWorker);
  yield takeEvery(ASYNC_DECREMENT, decrementWorker);
}
