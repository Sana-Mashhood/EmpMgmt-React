import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataFormPage from './pages/DataFormPage';
import DisplayPage from './pages/DisplayPage';
import Home from './pages/Home';
import DummyData from './pages/DummyData';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="inputForm" element={<DataFormPage />} />
        <Route path="displayData" element={<DisplayPage />} />
        <Route path="inputForm/:employeeId" element={<DataFormPage />} />
        <Route path="dumdums" element={<DummyData />} />
      </Routes>
    </BrowserRouter>
  );  
}

export default App;
