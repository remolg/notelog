import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Notlugum from './components/Notlugum';
import CreateNote from './components/CreateNote';
import NoteDetail from './components/NoteDetail';
import Trash from './components/Trash';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Notlugum />} />
        <Route path="/createnote" element={<CreateNote />} />
        <Route path="/note/:id" element={<NoteDetail />} />
        <Route path="/trash" element={<Trash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
