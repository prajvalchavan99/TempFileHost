import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import QRCode from "react-qr-code";
import Footer from "../common/Footer";

const FileDisplayPage = () => {
  const [searchParams] = useSearchParams();
  const endpoint = searchParams.get("filename");
  const navigate = useNavigate();
  const [filename, setFilename] = useState("");
  const [validity, setValidity] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copyTextMsg, setCopyTextMsg] = useState("");
  useEffect(() => {
    const fetchFileMetadata = async () => {
      try {
        const response = await api.get(`upload/${endpoint}`);
        setFilename(response.data.file_name);
        setValidity(response.data.validity);
      } catch (error) {
        console.error("Error fetching file metadata:", error);
        setError("File not found or has expired");
      }
    };

    fetchFileMetadata();
  }, [endpoint]);

  const downloadFile = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(
        `download-uploaded-file/${endpoint}`,
        { responseType: "blob" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const blob = response.data; // Blob data is already available
        const downloadLink = document.createElement("a");
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = filename || "downloaded_file"; // Use filename if available
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else {
        console.error("Failed to download the file.");
        setError("Failed to download the file.");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error downloading file:", error);
      setError("Error occurred during file download.");
      setIsLoading(false);
    }
  };

  const handleUrlFocus = (event) => {
    event.target.select();
    document.execCommand("copy");
    setCopyTextMsg("Url copied!");
  };

  const navigateToHome = () => {
    navigate(`/TempFileHost/`);
  };

  return (
    <div>
      <Header />
      <div className="file-upload-form">
        <div className="landing-container">
          {error ? (
            <>
              <p className="detail-text" style={{ textAlign: "center" }}>
                {error}
              </p>
              <br />
              <button className="upload-btn" onClick={navigateToHome}>
                Upload a file
              </button>
            </>
          ) : (
            <>
              <p className="detail-text">
                File name: <b>{filename}</b>
              </p>
              <p className="detail-text">
                Validity time: <b>{validity} minutes</b>
              </p>
              <QRCode value={window.location.href} className="QRCode-box" />
              <br />
              <input
                type="text"
                value={window.location.href}
                readOnly={true}
                onFocus={handleUrlFocus}
              />
              <p style={{ margin: 0, marginTop: "5px", fontSize: "16px" }}>
                {copyTextMsg}
              </p>
              <br />
              <br />
              <button
                className="upload-btn"
                style={{
                  width: "197px",
                  pointerEvents: isLoading ? "none" : "auto",
                }}
                onClick={downloadFile}
              >
                {!isLoading ? (
                  "Download File"
                ) : (
                  <span class="button-loader"></span>
                )}
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FileDisplayPage;
