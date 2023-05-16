import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";

function App() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  // Variables for adding new data into table
  const [inputName, setInputName] = useState();
  const [inputEmail, setInputEmail] = useState();
  const [inputOrg, setInputOrg] = useState();

  // Remove row from the table
  const removeElement = (index) => {
    setArray((oldValues) => {
      return oldValues.filter((_, i) => i !== index);
    });
  };

  // Add new row into the table
  const addElement = () => {
    var item = {
      name: inputName,
      email: inputEmail,
      sub_organisation: inputOrg,
    };
    var data = array;
    data.push(item);
    setArray([...data]);
  };

  // create file variable
  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Convert the text of the CSV file into values to be stored in an array
  const csvFileToArray = (string) => {
    // Take the first data which is the header and split to get the individual header
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    // The remaining data to be stored into csvRows
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  // get the data of the file into a variable and convert the data into text
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };
      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <div className="App">
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />
        <button
          className="bg-gray-300 hover:bg-yellow--300 ..."
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          Upload File
        </button>
      </form>
      <br />

      <table className="App-table">
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item, index) => (
            <tr key={item}>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}

              <td>
                <button
                  onClick={(e) => {
                    removeElement(index);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <label>Name: </label>
      <input
        className="App-input"
        type={"text"}
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />
      <label>Email: </label>
      <input
        className="App-input"
        type={"text"}
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
      />
      <label>Sub-Organisation: </label>
      <input
        className="App-input"
        type={"text"}
        value={inputOrg}
        onChange={(e) => setInputOrg(e.target.value)}
      />
      <button
        onClick={(e) => {
          addElement();
        }}
      >
        Add Row
      </button>
    </div>
  );
}

export default App;
