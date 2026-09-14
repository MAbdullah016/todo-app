
import "../styles/Edit.css";

import Button from "../components/Button";

import { useContext, useState } from "react";

import { NamesContext } from "../context/NamesContext";

function Edit() {
  const { names, setNames } = useContext(NamesContext);

  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  function startEditing(id, currentName) {
    setEditingId(id);
    setEditValue(currentName);
  }

  async function editName(id) {
    if (!editValue || editValue.trim() === "") {
      return;
    }

    const response = await fetch(`/api/names/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editValue.trim(),
      }),
    });

    const updatedName = await response.json();

    setNames(
      names.map((item) =>
        item.id === id ? updatedName : item
      )
    );

    setEditingId(null);
    setEditValue("");
  }

  return (
    <div className="edit">
      <h1>Edit Names</h1>

      {names.length === 0 ? (
        <p>No names available.</p>
      ) : (
        <ul className="edit-list">
          {names.map((name) => (
            <li key={name.id}>

              {editingId === name.id ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />

                  <Button
                    className="edit-button"
                    onClick={() => editName(name.id)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <span>{name.name}</span>

                  <Button
                    className="edit-button"
                    onClick={() =>
                      startEditing(name.id, name.name)
                    }
                  >
                    Edit
                  </Button>
                </>
              )}

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Edit;

