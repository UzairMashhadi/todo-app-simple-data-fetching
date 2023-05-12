import React from "react";

function TodoList({ item, todos, setTodos, setLoader, loader }) {
  // mark todo as done
  function markTodoAsDone() {
    setLoader(!loader);
    fetch(`http://localhost:3000/update/${item?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: !item?.status }),
    })
      .then((response) => response.json())
      .then((todo) => {
        setTodos(todos?.map((t) => (t.id === todo.id ? todo : t)));
      })
      .catch((error) => console.error("Error marking todo as done:", error));
  }

  const handleChange = () => {
    markTodoAsDone();
  };

  //delete todo
  function deleteTodo() {
    fetch(`http://localhost:3000/delete/${item?.id}`, {
      method: "DELETE",
    })
      .then(() => setTodos(todos.filter((todo) => todo.id !== item?.id)))
      .catch((error) => console.error("Error deleting todo:", error));
  }

  return (
    <div
      className={`flex flex-col sm:flex-row items-start gap-4 sm:gap-0 sm:justify-between py-2 px-5 sm:items-center rounded-lg ${
        item?.status ? "bg-blue-400" : "bg-slate-100"
      } shadow-lg  mb-[1rem]`}
    >
      <div className="flex gap-5 items-center cursor-pointer">
        <input
          onChange={handleChange}
          defaultChecked={item?.status}
          className="w-[1.4rem] h-[1.4rem]"
          type="checkbox"
        />
        <p
          className={`capitalize ${
            item?.status && "line-through text-zinc-50"
          } text-[1rem] font-light`}
        >
          {item?.title}
        </p>
      </div>
      <button
        onClick={deleteTodo}
        className="py-2 px-4 text-[1rem] text-[white] bg-[red] rounded-lg"
      >
        Delete
      </button>
    </div>
  );
}

export default TodoList;
