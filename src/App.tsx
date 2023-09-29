import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

interface User {
  _id?: any;
  name: string;
  age: string;
  username: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");

  const createUser = () => {
    Axios.post("https://correct-mern-exampke.onrender.com/createUser", {
      name,
      username,
      age,
    }).then((response) => {
      if (response.status === 200) {
        setUsers([...users, response.data]);
      } else {
        alert("asd");
      }
    });
  };

  const loadUsers = async () => {
    try {
      const response = await Axios.get(
        "https://correct-mern-exampke.onrender.com/getUser"
      );
      setUsers(response.data as User[]);
    } catch (err) {
      console.error("Error al cargar la lista de usuarios: ");
    }
  };

  const deleteUser = async (userId: any) => {
    await Axios.delete(
      `https://correct-mern-exampke.onrender.com/deleteUser/${userId}`
    ).then((response) => {
      if (response.status === 200) {
        setUsers(users.filter((user) => user._id !== userId));
      }
      loadUsers();
    });
  };

  useEffect(() => {
    Axios.get("https://correct-mern-exampke.onrender.com/getUser").then(
      (response) => {
        setUsers(response.data as User[]);
      }
    );
  }, []);

  return (
    <div className="">
      <div className="p-5 sm:grid sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5 space-y-4 items-baseline justify-center">
        <input
          type="text"
          placeholder="Name"
          value={name}
          className="w-full p-2 border "
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          className="w-full p-2 border"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          className="w-full p-2 border"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <button
          onClick={createUser}
          className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Create User
        </button>
      </div>

      <div className="users-display">
        {users.map((user) => {
          return (
            <div className="user-layout">
              <h1 className="">Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Username: {user.username}</h1>
              <button
                onClick={() => {
                  deleteUser(user._id);
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
