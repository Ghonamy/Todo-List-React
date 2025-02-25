import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const [newTask, setNewTask] = useState("");
  const inputHandler = (e) => {
    setNewTask(e.target.value);
  };
  const addTask = () => {
    if (newTask !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { task: newTask, completed: false },
      ]);
      setNewTask("");
    } else {
      Swal.fire({
        title: "You Must Enter a Task",
        text: "",
        icon: "warning",
      });
    }
  };
  const deleteTask = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Won't be able to Revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const completedTasks = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (index === i) {
        return { ...task, completed: !task.completed };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  };
  return (
    <div className="bg-(--main-background) min-h-screen text-(--text-color) p-10">
      <div className="bg-(--secondary-background) w-[500px] rounded-xl flex flex-col justify-center items-center mx-auto p-6 mt-[80px] shadow-[0_0_10px_#1a1a40]">
        <h1 className="text-[40px] font-bold">Get Things Done!</h1>
        <div className="flex items-center w-full mt-5">
          <input
            className="px-3 py-2 outline-0 border-(--main-background) border-2 rounded-[5px] mr-3 w-3/4 text-[18px] focus:shadow-[0_0_5px_#8758ff]"
            type="text"
            placeholder="What's The Task Today?"
            value={newTask}
            onChange={inputHandler}
          />
          <button
            onClick={addTask}
            className="bg-(--main-background) rounded-[5px] px-3 py-2 border-(--main-background) border-2 w-1/4 cursor-pointer text-[18px] duration-300 hover:bg-(--hover-color)"
          >
            Add Task
          </button>
        </div>
        <div className="w-full mt-4">
          <ul>
            {tasks.map((task, index) => {
              return (
                <li
                  onClick={() => completedTasks(index)}
                  key={index}
                  className={`bg-(--main-background) px-4 py-3 rounded-[5px] w-full mt-4 text-[20px] font-semibold cursor-pointer duration-300 hover:bg-(--hover-color) flex items-center justify-between ${
                    task.completed ? "bg-[#633fbe]" : ""
                  }`}
                >
                  <span className={`${task.completed ? "line-through" : ""}`}>
                    {task.task}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      deleteTask(index);
                    }}
                    className="cursor-pointer text-[22px]"
                  >
                    <FaTrash />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
