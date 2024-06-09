import { BrowserRouter, Route, Routes } from "react-router-dom"
import Notlugum from "./components/Notlugum"
import CreateNote from "./components/CreateNote"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Notlugum />} />
        <Route path="/createnote" element={<CreateNote />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
