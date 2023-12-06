import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"
import { useEffect, useState } from 'react';
import { api } from "./utilities"

function App() {
  const [user, setUser] = useState("")
  const [signedIn, setSignedIn] = useState(false)
  const [displayName, setDisplayName] = useState("")



  const getUserInfo = async () => {
    if (signedIn) {
      try {
        const response = await api.get("users/info/");
        setDisplayName(response.data["display_name"])
      } catch (err) {
        console.log("something went wrong", err)
      }
    }

  }
  useEffect(() => {
    getUserInfo()
  }, [user])

  return (
    <>
      <NavBar user={user} signedIn={signedIn} setUser={setUser} setSignedIn={setSignedIn} displayName={displayName} />
      <Outlet context={{ user, setUser, signedIn, setSignedIn }} />
    </>
  )
}

export default App
