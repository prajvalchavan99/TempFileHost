import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";

export default function FileUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [validityTime, setValidityTime] = useState(5);
  const [endpoint, setEndpoint] = useState();
  const [error, seterror] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleUpload = () => {
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("endpoint", endpoint);
    formdata.append("validity", validityTime);

    api
      .post("/upload/", formdata)
      .then((response) => {
        console.log("File uploaded", response.data);
        navigate(`/${endpoint}`);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error!", error.response.data.message);
        setFile(null);
        seterror(error.response.data.message);
        setIsLoading(false);
      });
  };

  const handleValidityChange = (e) => {
    setValidityTime(e.target.value);
  };

  const handleEndpointChange = (e) => {
    setEndpoint(e.target.value);
  };

  const validityCheck = (e) => {
    if (
      e.target.value !== "" &&
      e.target.value >= 5 &&
      e.target.value <= 24 * 60
    ) {
      setValidityTime(e.target.value);
    } else {
      setValidityTime(5);
    }
  };

  const endpointCheck = (e) => {
    if (
      e.target.value !== "" &&
      e.target.value.length >= 4 &&
      e.target.value.length <= 20
    ) {
      setEndpoint(e.target.value.replaceAll(" ", ""));
    } else {
      setEndpoint(generateRandomndpoint());
    }
  };

  const generateRandomndpoint = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz1234567890";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  useEffect(() => {
    setEndpoint(generateRandomndpoint());
  }, []);

  return (
    <div>
      <Header />
      <div className="file-upload-form">
        <div className="landing-container">
          {file ? (
            <div className="file-preview">
              <p>
                Selected File: <b>{file.name}</b>
              </p>
              <label>
                Validity Time (in minutes):
                <input
                  type="number"
                  value={validityTime}
                  onChange={handleValidityChange}
                  onBlur={validityCheck}
                  min={5}
                  max={24 * 60} // 1 day in minutes
                />
              </label>
              <label>
                Url:
                <input
                  type="text"
                  value={endpoint}
                  onChange={handleEndpointChange}
                  maxLength={20}
                  onBlur={endpointCheck}
                />
              </label>
              {window.location.href + endpoint}
              <br />
              <div className="action-buttons">
                <button
                  className="upload-btn"
                  style={{
                    pointerEvents: isLoading ? "none" : "auto",
                  }}
                  onClick={handleUpload}
                >
                  {!isLoading ? "Upload" : <span class="button-loader"></span>}
                </button>
                <button className="cancel-btn" onClick={() => setFile(null)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="upload-box">
              <input
                type="file"
                id="file-input"
                className="file-input"
                onChange={handleFileChange}
              />
              <label htmlFor="file-input" className="upload-btn">
                Select a File
              </label>
              <p>Upload file less than 50mb.</p>
              {error ? <p className="error-msg">{error}</p> : ""}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
