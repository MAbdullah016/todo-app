import { useState, useEffect } from "react";
import { NamesContext } from "./NamesContext";

export function NamesProvider({ children }) {

    const [names, setNames] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) throw new Error("File not found");
        return res.json();
      })
      .then((data) => {
        if (data) setNames(data);
      })
      .catch((err) => {
        console.log("Starting with empty list or error reading file:", err);
        setNames([]); 
      });
  }, []);



  return (
    <NamesContext.Provider value={{ names, setNames }}>
      {children}
    </NamesContext.Provider>
  );
}
