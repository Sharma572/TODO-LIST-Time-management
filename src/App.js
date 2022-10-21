import React, { useState } from "react";
import "./App.css";
import BasicTable from "./BasicTable";

const App = () => {
  const [task, setTask] = useState({ startTime: "", endTime: "", text: "" });
  const [data, setdata] = useState([]);
  const [buttonText, setbuttonText] = useState("Add");
  const [editData, showEditData] = useState(-1);

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setTask({ ...task, [name]: value });
  };

  const handleForm = () => {
    let newRecords = { ...task };

    setdata([...data, newRecords]);
  };

  //  Delete opration =========>
  function handleDelete(index) {
    let newArray = data.filter((item) => {
      if (item !== data[index]) {
        return item;
      }
    });
    setdata(newArray);
  }
  //  Edit Opration ===========>
  let newTodo = [...data];

  // console.log(newTodo[0].startTime);
  function onTextEdit(e, index) {
    newTodo[index].startTime = e.target.value;
    newTodo[index].endTime = e.target.value;
    newTodo[index].text = e.target.value;
    setdata(newTodo[index]);
  }

  function handleEdit(index) {
    showEditData(index);
    setbuttonText("Save");
  }

  return (
    <div className="App">
      {editData == -1 || editData == undefined ? (
        <>
          <input
            type="text"
            placeholder="Start Time"
            value={task.startTime}
            name="startTime"
            onChange={handleOnChange}
          />
          <input
            type="text"
            placeholder="End Time"
            value={task.endTime}
            name="endTime"
            onChange={handleOnChange}
          />
          <input
            type="text"
            placeholder="Task Discription"
            value={task.text}
            name="text"
            onChange={handleOnChange}
          />
        </>
      ) : (
        <>
          <input
            type="text"
            value={task.startTime}
            name="startTime"
            onChange={(e) => onTextEdit(e, editData)}
          />
          <input
            type="text"
            value={task.endTime}
            onChange={(e) => onTextEdit(e, editData)}
            name="endTime"
          />
          <input
            type="text"
            value={task.text}
            onChange={(e) => onTextEdit(e, editData)}
            name="text"
          />
        </>
      )}

      <button id="addList" onClick={handleForm}>
        {buttonText}
      </button>
      <BasicTable
        allData={data}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default App;
