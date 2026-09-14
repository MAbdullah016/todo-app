import { useContext, useState } from "react";
import { NamesContext } from "../context/NamesContext";
import "../styles/Home.css";
import Button from "../components/Button";


function Home() {
  const { names, setNames } = useContext(NamesContext);
  const [name, setName] = useState("");
  const [format, setFormat] = useState("normal");

async function addName() {
  if (name.trim() === "") {
    return;
  }

  let newName = name.trim();

  if (format === "uppercase") {
    newName = newName.toUpperCase();
  } else if (format === "lowercase") {
    newName = newName.toLowerCase();
  }

  const response = await fetch("/api/names", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newName,
    }),
  });

  const addedName = await response.json();

  setNames([...names, addedName]);

  setName("");
}


 async function deleteName(id) {
  const response = await fetch(`/api/names/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    console.log("Delete failed");
    return;
  }

  setNames(names.filter((item) => item.id !== id));
}


  return (
    <div className="home">
      <h1>Home Page</h1>

      <div className="name-input">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
  value={format}
  onChange={(e) => setFormat(e.target.value)}
>
  <option value="normal">Normal</option>
  <option value="uppercase">UPPERCASE</option>
  <option value="lowercase">lowercase</option>
</select>

<Button className='add-button' onClick={addName}>Add Name</Button>    
  </div>

      <h2>Names List</h2>

      {names.length === 0 ? (
        <p>No names added yet.</p>
      ) : (
        <ul className="names-list">
          {names.map((name, index) => (
            <li key={index}>
             <span>{name.name}</span>

              <Button className='delete-button' onClick={() => deleteName(name.id)}>Delete</Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
