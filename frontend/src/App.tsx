import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Landing } from "./screens/Landing"
import { Game } from "./screens/Game"

export default function App(){



  return <div className="h-screen bg-slate-950">
  <BrowserRouter>
  <Routes>
    <Route path = "/" element = {<Landing/>}></Route>
    <Route path = "/game" element = {<Game/>}></Route>


  </Routes>
  </BrowserRouter>
  </div>
  
}