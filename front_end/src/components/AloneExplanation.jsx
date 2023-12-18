import { useState, useEffect } from 'react'
import { api } from "../utilities"
import Button from 'react-bootstrap/Button';
import AloneForm from "../components/AloneForm";

function AloneExplanation({ newGame, setNewGame, signedIn, playerName, makeNewGameProfile, handleChange }) {
    const [apodData, setApodData] = useState();

    const getApodData = async () => {
        const response = await api.get("apod/")
        setApodData(response.data)

    }

    useEffect(() => {
        getApodData();
    }, [])

    return (
        <div className='aloneExplanation'>
            {apodData &&
                <div className='apod'>
                    <img src={(apodData.media_type == "video") ? apodData.thumbnail_url : apodData.url} className='apodImg' alt={apodData.title} />
                </div>
            }
            <div className='aloneText'>
                <p>A lonely traveller, exploring the universe. </p>
                <p>Alone Among the Stars, written by Takuma Okada and published in 2018, is a solo journaling role-playing game
                    of exploring strange new worlds, finding exotic flora and fauna as you go. The tabletop version is played using a
                    standard deck of cards and a six-sided die. A round of gameplay is considered the exploration of a single planet. The
                    player rolls the die to determine how many discoveries are on the world they landed on. They then deal out that amount
                    of cards. They flip each card, rolling the die again to determine how they find the next discover (i.e. an arduous journey,
                    resting, etc). The card's suit determines the type of discovery (i.e. ruins, plant life, etc). The value of the card gives
                    the location of the discovery (i.e. on a volcano, in the jungle). The player then writes a journal entry from the perspective
                    of their character detailing the discovery. Once they have written their journal entry, they flip the next card. Once all
                    cards have been flipped and all entries written, the player's character can travel to a new planet, discovering new features (and
                    themselves) along the way.
                </p>
                <p>QuillQuest simplifies your playing experience by rolling the dice and providing the cards for you. You can save your journal entries
                    in the ship's log, coming back anytime to explore more planets.
                </p>


            </div>


            {signedIn && <Button variant="dark" className="newGameBtn" onClick={e => setNewGame(!newGame)} >{(!newGame) ? "Start New Game" : "Close Form"}</Button>}
            {newGame && <AloneForm makeNewGameProfile={makeNewGameProfile} playerName={playerName} handleChange={handleChange} />}
        </div>
    )
}

export default AloneExplanation;