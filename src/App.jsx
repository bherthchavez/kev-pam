import { Routes, Route } from "react-router-dom"
import Home from "./components/Home";
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
      <main className={`bg-[#000000]  font-glacial`}>
        <Routes>

          <Route path="/" element={<Home />} />

        </Routes>
        <Analytics />
      </main>
    </>
  )
}

export default App;