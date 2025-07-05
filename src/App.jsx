import { useState } from "react";

function App() {

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("File object:", selectedFile);
      console.log("File name:", selectedFile.name);
    }

  }; 
  return (
    <div className="bg-slate-900 w-screen h-screen font-mono text-white">
      <div className="justify-self-center p-10 space-y-10">
        <p>Resume Generator</p>

        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="file_input"
          >
            Step 1: Upload your LinkedIn export file
            <br />
            <a
              href="https://www.linkedin.com/mypreferences/d/download-my-data"
              className="text-orange-400"
            >
              {" "}
              {">> Export your Data via this link <<"}{" "}
            </a>
          </label>
          <input
            className="p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            accept=".json,.csv"
          />
          <p className="mt-1 text-sm text-gray-400 " id="file_input_help">
            CSV, JSON (MAX. 200 MB).
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">
            Step 2: Enter your Github username
          </p>

          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="User123"
            required
          />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">
            Step 3: Enter your Leetcode username
          </p>

          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="User123"
            required
          />
        </div>

        <div className="w-full flex justify-center">
          <button class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-3 px-4 rounded-full">
            Generate Resume
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
