import { Routes, Route } from "react-router-dom"
import Home from "./components/Home";
import Confirm from "./components/Confirm";
import GuestsList from "./components/GuestsList";

function App() {
  return (
    <Routes>
      <Route path="/rsvp/:id" element={<Confirm />} />
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<GuestsList />} />
    </Routes>

  )
}

export default App;