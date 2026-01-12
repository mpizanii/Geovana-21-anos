import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PartyInfo from './pages/PartyInfo';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PartyInfo />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
