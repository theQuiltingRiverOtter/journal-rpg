import { useState, useEffect } from "react"
import { api } from "../utilities"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ThreeDots } from "react-bootstrap-icons";

function PublicGames() {
    const [publicGames, setPublicGames] = useState([]);
    const [currentGame, setCurrentGame] = useState()

    const getAllPublicGames = async () => {
        const response = await api.get("profiles/games/")
        setPublicGames(response.data)
    }

    useEffect(() => {
        getAllPublicGames();
    }, [])

    const showGameEntries = (game) => (e) => {
        setCurrentGame(game)
    }


    return (
        <div>
            {!currentGame && publicGames.length > 0 && publicGames.map((game) => (
                <Card key={game.id} style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{game.game_name}</Card.Title>
                        <Card.Subtitle>{game.player_name}</Card.Subtitle>
                        <Button onClick={showGameEntries(game)} variant="dark">See Journal</Button>
                    </Card.Body>
                </Card>
            ))}
            {currentGame && <div>
                <h1>{currentGame.game_name}</h1>
                <h4>{currentGame.player_name}</h4>
                <div> {currentGame.entries.map(entry => (
                    <p key={entry.id}><b>{entry.posted_date}:</b> {entry.content}</p>
                ))}
                </div>
                <Button onClick={() => setCurrentGame("")}>Close Game</Button>
            </div>}
        </div>
    )
}

export default PublicGames;