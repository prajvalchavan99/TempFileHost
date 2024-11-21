import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import FileUpload from './components/upload/FileUpload';
import FileDisplayPage from './components/upload/FileDisplayPage';

function App() {
  return (
    <Router>
        <Route path='TempFileHost/' exact Component={FileUpload}/>
        <Route path='TempFileHost/:endpoint' element={<FileDisplayPage/>}/>
    </Router>
  );
}

export default App;
