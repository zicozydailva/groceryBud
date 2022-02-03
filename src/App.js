import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list")
  if(list) {
    return (list = JSON.parse(localStorage.getItem("list")))
  } else {
    return [];
  }
}

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState("");
  const [alert, setAlert] = useState({show: false, msg: '', type: ''});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // show alert
    } else if (name && isEditing) {
      setList(list.map(item => {
        if(item.id === editID) {
          return {...item, title: name}
        }
        return item
      }))
      setName("")
      setEditID(null)
      setIsEditing(false)
      showAlert(true, "success", "Edit Success!!")

    } else {
      showAlert(true, "success", "Item Added")
      let newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show=false, type="", msg="") => {
    setAlert({show, type, msg})
  }

  const clearItems = () => {
    showAlert(true, "success", "Successfully cleared Items!!")
    setList([])
  }
  const deleteItem = (id) => {
    showAlert(true, "danger", "Item Removed")
    let tempItem = list.filter(item => item.id !== id)
    setList(tempItem)
  }

  const editItem = (id) => {
    let specificItem = list.find(item => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])
  return (
    <section className="section-center">
      <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show && <Alert {...alert} showAlert={showAlert} list={list} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            className="grocery"
            placeholder="E.g Eggs"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} deleteItem={deleteItem} editItem={editItem} />
          <button onClick={() => clearItems()} className="clear-btn">Clear Items</button>
        </div>
      )}
    </section>
  );
}

export default App;
