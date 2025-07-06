import { useState } from "react";

function App() {
  // -------------- Error Messages --------------
  const [gitError, setGitError] = useState("");
  const [leetError, setLeetError] = useState("");

  // -------------- User Input --------------
  const [file, setFile] = useState(null);
  const [gitUsername, setGitUsername] = useState("");
  const [leetUsername, setLeetUsername] = useState("");

  // -------------- Fetched API Data: validity --------------
  const [validGitUsername, setValidGitUsername] = useState(false);
  const [validLeetUsername, setValidLeetUsername] = useState(false);
  const [validFileUpload, setValidFileUpload] = useState(false);

  // -------------- Fetched API Data: resume generation --------------

  // -------------- File Upload Handler --------------
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // if a file is selected
    if (selectedFile) {
      const fileName = selectedFile.name.toLowerCase();
      // if ends with .json or .csv
      if (fileName.endsWith(".json") || fileName.endsWith(".csv")) {
        // assign valid file
        setFile(selectedFile);
        console.log("File object:", selectedFile);
        console.log("Valid File name:", selectedFile.name);
      }
      // otherwise show error for invalid file type
      else {
        alert("Please upload a .json or .csv file.");
      }
    }
  };

  // -------------- API call Handlers --------------
  async function generatePressed() {
    // Reset errors/validations
    setGitError(""); 
    setLeetError("");
    setValidGitUsername(false);
    setValidLeetUsername(false);
    setValidFileUpload(false);

    // check if inputs present
    if (!gitUsername || !leetUsername || !file) {
      if (!gitUsername) setGitError("Please enter your Github username.");
      if (!leetUsername) setLeetError("Please enter your Leetcode username.");
      if (!file) alert("Please upload a .json or .csv file.");
      return;
    }

    // validate usernames and given file
    const [gitValid, leetValid, fileValid] = await Promise.all([
      fetchGitHub(),
      fetchLeetCode(),
      fetchLinkedinValidity(),
    ]);

    // if all validated, generate resume
    if (gitValid && leetValid && fileValid) {
      await generateResume();
    } else {
      return;
    }
  }

  // GitHub username validation
  const fetchGitHub = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/github/${gitUsername}`
      );
      if (!res.ok) {
        setGitError("Username not found!");
        return false;
      }
      setValidGitUsername(true);
      return true;
    } catch (err) {
      setGitError("Error connecting to GitHub API");
      return false;
    }
  };

  // LeetCode username validation
  const fetchLeetCode = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/leetcode/${leetUsername}`
      );
      if (!res.ok) {
        setLeetError("Username not found!");
        return false;
      }
      setValidLeetUsername(true);
      return true;
    } catch (err) {
      setLeetError("Error connecting to LeetCode API");
      return false;
    }
  };

  // LinkedIn file validation
  const fetchLinkedinValidity = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`http://localhost:5000/api/linkedin`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert("Uploaded file is not a valid LinkedIn JSON/CSV");
        return false;
      }

      setValidFileUpload(true);
      return true;
    } catch (err) {
      alert("Error validating LinkedIn file");
      return false;
    }
  };

  // Resume generation via backend
  const generateResume = async () => {
    /*try {
    const formData = new FormData();
    formData.append("githubUsername", gitUsername);
    formData.append("leetcodeUsername", leetUsername);
    formData.append("linkedinFile", file);

    const res = await fetch(`http://localhost:5000/api/resume/pdf`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Failed to generate resume.");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.pdf";
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    alert("Error generating resume PDF");
  }
    */
  };

  // -------------- Page Body --------------
  return (
    <div className="bg-gradient-to-bl from-slate-700 to-slate-950 w-screen h-screen font-mono text-white text-sm font-medium flex justify-center items-center">
      <div className="justify-self-center p-10 space-y-8 bg-white/5 rounded-xl shadow-md shadow-black/30 border border-white/10">
        <p className="text-lg"> Resume-Generator</p>

        <div>
          <label
            class="block mb-2 text-gray-900 dark:text-white"
            for="file_input"
          >
            Step 1: Upload your LinkedIn export file
            <br />
            <a
              href="https://www.linkedin.com/mypreferences/d/download-my-data"
              className="text-orange-400"
            >
              {" "}
              {">> Export your data via this link <<"}{" "}
            </a>
          </label>
          <input
            className="focus:ring focus:border p-2 block w-full text-gray-900 border rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            accept=".json,.csv"
            onChange={handleFileChange}
          />
          <p className="mt-1 text-gray-400 text-xs" id="file_input_help">
            CSV, JSON (MAX. 200 MB).
          </p>
        </div>

        <div className="space-y-1">
          <p className="">Step 2: Enter your Github username</p>

          <input
            type="text"
            value={gitUsername}
            onChange={(e) => setGitUsername(e.target.value)}
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5
            dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white
          focus:ring-blue-500 focus:border-blue-500
            ${gitError ? "border-red-500" : "border-gray-300"}`}
            placeholder="User123"
            maxLength={39}
          />
          <p className="text-xs text-red-500">{gitError}</p>
        </div>

        <div className="space-y-1">
          <p className="">Step 3: Enter your Leetcode username</p>

          <input
            type="text"
            value={leetUsername}
            onChange={(e) => setLeetUsername(e.target.value)}
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5
            dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white
          focus:ring-blue-500 focus:border-blue-500
            ${leetError ? "border-red-500" : "border-gray-300"}`}
            placeholder="User123"
            maxLength={50}
          />

          <p className="text-xs text-red-500">{leetError}</p>
        </div>

        <div className="w-full flex justify-center">
          <button
            className="bg-green-700 hover:bg-green-800 text-white py-3 px-4 rounded-full focus:outline-none"
            onClick={generatePressed}
          >
            Generate Resume
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
