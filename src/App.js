import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import FileUpload from './components/upload/FileUpload';
import FileDisplayPage from './components/upload/FileDisplayPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FileUpload />} />
        <Route path="file" element={<FileDisplayPage />} />
      </Routes>
    </Router>
  );
}

export default App;
