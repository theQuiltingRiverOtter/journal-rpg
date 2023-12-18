import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { api } from "../utilities"
import ThymeExplanation from "../components/ThymeExplanation";
import ThymeProfile from "../components/ThymeProfile";
import NewThymeDay from "../components/NewThymeDay";
import ThymeProfileList from "../components/ThymeProfileList";
import "../styles/thymePage.css"

function ThymePage() {
    const { signedIn } = useOutletContext();
    const [hasGame, setHasGame] = useState(false)
    const [newGame, setNewGame] = useState(false)
    const [playerName, setPlayerName] = useState("")
    const [newProfile, setNewProfile] = useState(false)
    const [thymeProfile, setThymeProfile] = useState()
    const [houseDescription, setHouseDescription] = useState()
    const [homeLocation, setHomeLocation] = useState()
    const [dayData, setDayData] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [currentProfile, setCurrentProfile] = useState()
    const [days, setDays] = useState([])


    const makeNewGameProfile = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post("profiles/", { player_name: playerName, game_name: "One Day at a Thyme" })
            setHasGame(true)
            const choices = ["A mountainside", "The woods", "A swamp", "The desert", "Beneath a hill", "By the sea"]
            setHomeLocation(choices[Math.floor(Math.random() * 6)])
            setNewProfile(true)
            setNewGame(false)
        } catch (err) {
            console.log(err)
        }
    }

    const createThymeProfile = async (e) => {
        e.preventDefault()
        try {
            const respone = await api.post("thyme/", { house_description: houseDescription, home_location: homeLocation })
            setNewGame(false)
            setNewProfile(false)
            getGame()
        } catch (err) {
            console.log(err)
        }
    }
    const createDay = (id) => async () => {
        let lastDay = 0
        for (let day of days) {
            if (day.day >= lastDay) {
                lastDay = day.day
            }
        }

        let newDay = lastDay + 1
        const response = await api.post(`thyme/${id}/day/`, { day: newDay })
        setDayData(response.data)
        setLoaded(true)
        getGame()
    }



    const getDays = async (thyme_id) => {
        try {
            const response = await api.get(`thyme/${thyme_id}/day/`)
            setCurrentProfile(thyme_id)
            setDays(response.data)

        } catch (err) {
            console.log(err)
        }
    }


    const getGame = async () => {
        try {
            const response = await api.get("thyme/")
            if (response.data.length > 0) {

                setHasGame(true)
                setNewGame(false)
                setNewProfile(false)
                setThymeProfile(response.data)


            } else {
                const response = await api.get("profiles/thyme/")
                if (response.data.player_name) {
                    const choices = ["A mountainside", "The woods", "A swamp", "The desert", "Beneath a hill", "By the sea"]
                    setHomeLocation(choices[Math.floor(Math.random() * 6)])
                    setHasGame(true)
                    setNewProfile(true)

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


    }, [signedIn, newGame])

    useEffect(() => {
        if (thymeProfile && thymeProfile.length > 0) {

            for (let prof of thymeProfile) {

                getDays(prof.id)

            }
        }

    }, [thymeProfile, dayData])



    const handleChange = (e) => {
        setPlayerName(e.target.value)
    }

    return (
        <div className="thymePage">
            <h1 className="thymeTitle">One Day at a Thyme</h1>
            {!hasGame && <ThymeExplanation newGame={newGame} setNewGame={setNewGame} signedIn={signedIn} makeNewGameProfile={makeNewGameProfile} playerName={playerName} handleChange={handleChange} />}

            {newProfile && <ThymeProfile createThymeProfile={createThymeProfile} homeLocation={homeLocation} houseDescription={houseDescription} setHouseDescription={setHouseDescription} />}
            <div className="worksection">
                {thymeProfile && thymeProfile.length > 0 && <ThymeProfileList createDay={createDay} setHasGame={setHasGame} thymeProfile={thymeProfile} currentProfile={currentProfile} days={days} getGame={getGame} />}
                {loaded && <NewThymeDay thymeProfile={thymeProfile} getGame={getGame} dayData={dayData} />}
            </div>



        </div >
    );
}

export default ThymePage;