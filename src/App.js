import { Routes, Route, Link } from 'react-router-dom';
import Form from './components/Form';
import Homepage from './components/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/home" element={<Homepage />} />
    </Routes>
  );
}

export default App;
