import { Routes, Route } from "react-router-dom"
import Home from "./components/Home";
import GuestsList from "./components/GuestsList";

function App() {
  return (
    <>
      <main className={`bg-[#000000]  font-glacial`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<GuestsList />} />
        </Routes>
      </main>
    </>
  )
}

export default App;