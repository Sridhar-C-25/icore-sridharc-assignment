import { useEffect, useState } from "react";
import { newRequest } from "./services/newRequest";
const App = () => {
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    completed: false,
  });

  const [tasks, setTasks] = useState(null);
  const [edit, setEdit] = useState(false);
  const getAllTasks = () => {
    newRequest("/tasks")
      .then((res) => {
        console.log(res.data);
        setTasks(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllTasks();
  }, []);

  const onDelete = (id) => {
    newRequest(`/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
        alert(res?.data?.message);
        if (res.status == 200) {
          const updatedTasks = tasks?.filter((todo) => todo?.id !== id);
          setTasks(updatedTasks);
        }
      })
      .catch((err) => console.log(err));
  };

  // onChange
  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onCreate = (e) => {
    e.preventDefault();
    console.log(task);
    newRequest("/tasks", {
      method: "POST",
      data: task,
    })
      .then((res) => {
        console.log(res.data);
        alert(res.data?.message);
        if (res?.status === 200) {
          getAllTasks();
        }
        setTask({
          title: "",
          description: "",
          completed: "",
          id: "",
        });
      })
      .catch((err) => {
        console.log(err);
        setTask({
          title: "",
          description: "",
          completed: "",
          id: "",
        });
      });
  };
  const onEdit = (e) => {
    e.preventDefault();
    console.log(task);
    newRequest("/tasks/" + task.id, {
      method: "PUT",
      data: task,
    })
      .then((res) => {
        console.log(res.data);
        alert(res.data?.message);
        if (res?.status === 200) {
          getAllTasks();
        }
        setEdit(false);
        setTask({
          title: "",
          description: "",
          completed: "",
          id: "",
        });
      })
      .catch((err) => {
        console.log(err);
        setEdit(false);
        setTask({
          title: "",
          description: "",
          completed: "",
          id: "",
        });
      });
  };

  const onFilter = (status) => {
    console.log(status);
    newRequest("/tasks/" + status)
      .then((res) => {
        if (res.status === 200) {
          setTasks(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-xl text-center mt-5 font-semibold">Task App</h1>
      <form onSubmit={(e) => (edit ? onEdit(e) : onCreate(e))}>
        <div className="flex justify-center items-center gap-3 mt-4 flex-col">
          <input
            type="text"
            required
            placeholder="title"
            name="title"
            id="title"
            className="border p-2"
            onChange={onChange}
            value={task.title}
          />
          <input
            type="text"
            required
            placeholder="description"
            name="description"
            id="description"
            className="border p-2"
            onChange={onChange}
            value={task.description}
          />
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="completed"
              id="completed"
              checked={task.completed}
              onChange={(e) => {
                setTask({ ...task, completed: e.target.checked });
              }}
            />
            <label htmlFor="completed" className="cursor-pointer">
              Completed
            </label>
          </div>
          <button className="bg-gray-900 text-white  p-2 w-48 mt-3 mx-auto">
            submit
          </button>
        </div>
      </form>
      <div className="mt-6">
        {tasks?.length ? (
          <>
            <div className="flex gap-2 max-w-xl mx-auto mb-4">
              <input
                type="radio"
                id="complete"
                value={1}
                name="status"
                onChange={(e) => onFilter(e.target.value)}
              />
              <label htmlFor="complete">completed</label>
              <input
                type="radio"
                id="incomplete"
                value={0}
                name="status"
                onChange={(e) => onFilter(e.target.value)}
              />
              <label htmlFor="incomplete">incompleted</label>
            </div>
            <ul className="flex flex-col gap-2 divide-y">
              <li className="flex justify-center  mx-auto ">
                <span>Title</span>
                <span>Description</span>
                <span>status</span>
                <span>Todos Actions</span>
              </li>
              {tasks?.map((todo) => {
                return (
                  <li key={todo?.id} className=" flex justify-center  mx-auto">
                    <span>{todo?.title}</span>
                    <span>{todo?.description}</span>
                    <span>
                      {todo?.completed ? "completed" : "Not Completed"}
                    </span>
                    <span>
                      <button
                        className="text-red-600 mr-5"
                        onClick={() => onDelete(todo?.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="text-teal-500"
                        onClick={() => {
                          setEdit(true);
                          setTask({
                            title: todo.title,
                            description: todo.description,
                            completed: todo.completed,
                            id: todo?.id,
                          });
                        }}
                      >
                        Edit
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default App;
