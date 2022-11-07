import { put, takeEvery, call } from "redux-saga/effects";
import { FETCH_USERS, setUsers } from "../store/userReducer";
// call возвращает данные, которые прилетают к нам в промисе

const fetchUsersFromApi = () => fetch("https://jsonplaceholder.typicode.com/users?_limit=10");

function* fetchUserWorker() {
  // по аналогии с async-await. Создаём переменную, вызываем функцию call,
  // и в неё параметром передаём промис, который должен вернуть какие-то данные.
  // То, что вернёться в результате этого запроса, добавится в переменную data
  const data = yield call(fetchUsersFromApi);
  // Когда мы работаем с fetch(), нам так же необходимо из тех данных, которые мы получили в запросе,
  // вернуть json. Поэтому, здесь, по аналогии, в функцию call передадим стрелочную функцию,
  // которая возвращает промис. И результатом этого промиса будет как раз преобразование вводных данных
  // в data.json().
  const json = yield call(() => new Promise((res) => res(data.json())));
  // Теперь, в переменной json хранится массив пользователей, полученный с сервера.
  // Нам надо вызвать функцию put и туда передать экшенкреатер setUsers из countReducer,
  //

  yield put(setUsers(json));
}

// остаётся озадачить вотчер, чтобы он следил за этим воркером
export function* userWatcher() {
  yield takeEvery(FETCH_USERS, fetchUserWorker);
}
