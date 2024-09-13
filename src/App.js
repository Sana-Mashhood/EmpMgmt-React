import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataFormPage from './pages/DataFormPage';
import DisplayPage from './pages/DisplayPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<DisplayPage />} />
        <Route path="inputForm" element={<DataFormPage />} />
        <Route path="inputForm/:employeeId" element={<DataFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
