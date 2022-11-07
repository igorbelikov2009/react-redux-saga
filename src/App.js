import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncIncrementCreator, asynkDecrementCreator } from "./store/countReducer";
import { fetchUsers } from "./store/userReducer";
import "./App.css";

function App() {
  const count = useSelector((state) => state.countReducer.count);
  const users = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();

  console.log(count, users);
  return (
    <div className="App">
      <div className="count">{count}</div>

      <div className="btns">
        <button className="btn" onClick={() => dispatch(asyncIncrementCreator())}>
          ИНКРЕМЕНТ++
        </button>

        <button className="btn" onClick={() => dispatch(asynkDecrementCreator())}>
          ДЕКРЕМЕНТ--
        </button>

        <button className="btn" onClick={() => dispatch(fetchUsers())}>
          ПОЛУЧИТЬ ЮЗЕРОВ--
        </button>
      </div>

      <div className="users">
        {users.map((user) => (
          <div className="user" key={user.id}>
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
