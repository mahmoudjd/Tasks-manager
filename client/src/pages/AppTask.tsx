import React, { useEffect, useState, useCallback } from "react";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";
import MyButton from "../components/MyButton";

interface Task {
  _id: string;
  name: string;
  completed: boolean;
  createdAt: Date;
}

function AppTask() {
  const [token, setToken] = useState<string | null>(null);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [name, setName] = useState<string>("");
  const [isShown, setIsShown] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    const fetchTasks = async () => {
      if (!storedToken) return; // Verhindert den Aufruf ohne Token

      try {
        const response = await fetch("http://localhost:8080/tasks/get-tasks", {
          headers: {
            authorization: `Bearer ${storedToken}`,
          },
        });
        const data = await response.json();
        setAllTasks(data.tasks);
        setTasks(data.tasks);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };

    fetchTasks();
  }, [token]);

  const updateStatus = useCallback(
    async (taskId: string, completed: boolean) => {
      if (!token) return;

      try {
        const response = await fetch(
          `http://localhost:8080/tasks/update-status/${taskId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ completed }),
          },
        );

        if (!response.ok) throw new Error("Failed to update status");

        setAllTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, completed } : task,
          ),
        );
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, completed } : task,
          ),
        );
      } catch (error) {
        console.error(error);
      }
    },
    [token],
  );

  const addTask = async () => {
    if (!token || name.trim() === "") {
      alert("Please enter a task name!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/tasks/create-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, completed: false }),
      });

      const newTask = await response.json();
      setAllTasks((prev) => [...prev, newTask.task]);
      setTasks((prev) => [...prev, newTask.task]);
      setName("");
      setIsShown(false);
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:8080/tasks/delete-task/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error("Failed to delete task");

      setAllTasks((prev) => prev.filter((task) => task._id !== id));
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const filterTasks = useCallback(
    (completed?: boolean) => {
      setTasks(
        completed === undefined
          ? allTasks
          : allTasks.filter((task) => task.completed === completed),
      );
    },
    [allTasks],
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <MyButton
        type="button"
        name={isShown ? "Cancel" : "Add Task"}
        handleClick={() => setIsShown((prev) => !prev)}
      />
      {isShown && (
        <AddTask value={name} setValue={setName} onSubmit={addTask} />
      )}

      <TaskFilter onFilter={filterTasks} />
      <TaskList
        tasks={tasks}
        onStatusChange={updateStatus}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default AppTask;
