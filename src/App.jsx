import { Routes, Route } from "react-router-dom"
import Home from "./components/Home";


function App() {
  return (
    <>
      <main className={`bg-[#000000]  font-glacial`}>
        <Routes>

          <Route path="/" element={<Home />} />

        </Routes>
      </main>
    </>
  )
}

export default App;