import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { api } from "../utilities"
import AloneExplanation from "../components/AloneExplanation";

import PlanetList from "../components/PlanetList";
import NewPlanet from "../components/NewPlanet";
import "../styles/alonePage.css"




function AlonePage() {
    const [hasGame, setHasGame] = useState(false)
    const [newGame, setNewGame] = useState(false)
    const { signedIn } = useOutletContext();
    const [planets, setPlanets] = useState([])
    const [playerName, setPlayerName] = useState("")
    const [showNewPlanet, setShowNewPlanet] = useState(false)
    const [planetData, setPlanetData] = useState({})

    const makeNewGameProfile = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post("profiles/", { player_name: playerName, game_name: "Alone Among the Stars" })
            setHasGame(true)

        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setPlayerName(e.target.value)
    }

    const getNewPlanet = async () => {
        setShowNewPlanet(false)
        const response = await api.post("alone/")
        setPlanetData(response.data)
        setShowNewPlanet(true)
    }


    const getGame = async () => {
        try {
            const response = await api.get("alone/")
            if (response.data.length > 0) {
                setHasGame(true)
                setNewGame(false)
                setPlanets(response.data)
            } else {
                const response = await api.get("profiles/alone/")
                if (response.data.player_name) {
                    setHasGame(true)
                } else {
                    setHasGame(false)
                }

            }
        } catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        if (signedIn) {
            getGame()
        }

    }, [signedIn, planetData])

    return (
        <div className="alonePage">
            <h1 className="alonetitle">Alone Among the Stars</h1>
            {!hasGame && <AloneExplanation className="explanation" signedIn={signedIn} newGame={newGame} setNewGame={setNewGame} makeNewGameProfile={makeNewGameProfile} playerName={playerName} handleChange={handleChange} />}
            {signedIn && hasGame && < Button variant="dark" onClick={getNewPlanet}>Get New Planet</Button>}
            {
                signedIn && hasGame && <div className="workSection">
                    <PlanetList className="planetList" planets={planets} getGame={getGame} />
                    {showNewPlanet && <NewPlanet className="planet" planetData={planetData} getNewPlanet={getNewPlanet} getGame={getGame} />}

                </div>
            }


        </div >
    )
}

export default AlonePage;