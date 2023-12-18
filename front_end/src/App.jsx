import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"
import { useEffect, useState } from 'react';
import { api } from "./utilities"

function App() {
  const [user, setUser] = useState("")
  const [signedIn, setSignedIn] = useState(false)



  return (
    <>
      <NavBar user={user} signedIn={signedIn} setUser={setUser} setSignedIn={setSignedIn} />
      <Outlet context={{ user, setUser, signedIn, setSignedIn }} />
    </>
  )
}

export default App
