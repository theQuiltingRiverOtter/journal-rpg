import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { api } from "../utilities"

function MyGames() {
    const [myGames, setMyGames] = useState([])

    const getMyGames = async () => {
        try {
            const response = await api.get("profiles/")
            setMyGames(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getMyGames()
    }, [])

    return (
        <div>
            {myGames.length > 0 && myGames.map(game => (
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{game.game_name}</Card.Title>
                        <Card.Subtitle>{game.player_name}</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>

    );
}

export default MyGames;