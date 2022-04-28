import React, { useState, useEffect } from 'react'

const AddStudents = () => {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

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

  const uploadStudents = async () => {
    const response = await fetch("/api/admin/addStudents", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        array
      })
    })
    const data = await response.json()
    if (data.message) {
      alert(data.message)
    } else {
      alert("something went wrong")
    }
  }

  useEffect(() => {
    if (array.length > 0) {
      uploadStudents()
    }
  }, [array])



  return (
    <div>
      <div className="w-full mt-20 max-w-xs m-auto bg-indigo-100 rounded p-5">
        <div>
          <div>

            <label className="w-full mb-4 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-gray-900">
              <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">Select a CSV file</span>
              <input
                type={"file"}
                id={"csvFileInput"}
                accept={".csv"}
                onChange={handleOnChange}
                className="hidden"
              />
            </label>
          </div>
          <div>
            <button
              className="w-full dark:bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 mb-6 rounded"
              onClick={(e) => {
                handleOnSubmit(e);
              }}
            >
              Add Students
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddStudents
