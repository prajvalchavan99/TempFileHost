import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from '../../services/api';
import { useNavigate } from 'react-router-dom'

const FileDisplayPage = () => {
    const { endpoint } = useParams();
    const navigate = useNavigate();
    const [fileData, setFileData] = useState(null);
    const [filename, setFilename] = useState('')
    const [validity, setValidity] = useState(null)
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchFile = async () => {
            try {
                const response = await axios.get(`/upload/${endpoint}`);
                const blob = await fetch(response.data.file_url).then((r) => r.blob() );
                var file_url = response.data.file_url
                const filename = file_url.slice(response.data.file_url.lastIndexOf('/')+1, response.data.file_url.length);
                setFilename(filename) 
                setValidity(response.data.validity)
                setFileData(URL.createObjectURL(blob));
            } catch (error) {
                console.error('Error fetching file:', error);
                setError('File not found');
                // Handle error (e.g., show error message)
            }
        };

        fetchFile();
    }, [endpoint]);
    
    const downloadFile = () => {
        if (fileData) {
            const fileurl = fileData;
            // const url = window.URL.createObjectURL(blob);
            console.log(typeof fileData, fileData,">>",filename);
            const downloadLink = document.createElement('a');
            downloadLink.href = fileurl;
            // downloadLink.setAttribute('download', filename);
            downloadLink.download = filename
            downloadLink.click();
        }
    };

    const navigateToHome = () => {
        navigate(`/`);
    }

    return (
        <div>
            {error ? 
                <>
                    <p className="detail-text">{error}</p>
                    <button className="upload-btn" onClick={navigateToHome}>Upload a file</button>
                </> : (
                <>
                    <p className="detail-text">File name: {filename}</p>
                    <p className="detail-text">Validity time: {validity} minutes</p>
                    <button className="upload-btn" onClick={downloadFile}>Download File</button>
                </>
            )}
        </div>
    );
};

export default FileDisplayPage;