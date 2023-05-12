import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [loader, setLoader] = useState(false);

  // get todo
  const fetchTodo = () => {
    fetch("http://localhost:3000/get-todo")
      .then((response) => response.json())
      .then((todos) => setTodos(todos))
      .catch((error) => console.error("Error fetching todos:", error));
  };

  useEffect(() => {
    fetchTodo();
  }, [loader]);

  //add todo
  function addTodo(title) {
    if (title !== "") {
      fetch("http://localhost:3000/add-todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, status: false }),
      })
        .then((response) => {
          response.json();
        })
        .then((todo) => {
          setLoader(!loader);
          setTodos([...todos, todo]);
          setTitle("");
        })
        .catch((error) => console.error("Error adding todo:", error));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(title);
  };

  return (
    <div className="p-[1rem] sm:p-[7rem]">
      <h1 className="text-[3rem] font-bold text-center">
        Todo App Simple Data Fetching
      </h1>
      <div className="mt-[5rem] flex flex-col gap-5 items-center">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-[1rem] p-2 rounded-lg border-2 border-[blue]"
              placeholder="Enter Title"
            />
            <button
              type="submit"
              className="p-2 text-[1rem] text-[white] bg-[blue] rounded-lg"
            >
              Add Todo
            </button>
          </div>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 p-5 rounded-lg shadow-inner">
          {todos?.map((item) => {
            return (
              <TodoList
                key={item?.id}
                item={item}
                todos={todos}
                setTodos={setTodos}
                setLoader={setLoader}
                loader={loader}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
