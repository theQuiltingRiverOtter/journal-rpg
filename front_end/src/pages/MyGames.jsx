import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Pencil, ThreeDots, Trash } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';
import { api } from "../utilities"

function MyGames() {
    const [myGames, setMyGames] = useState([])
    const [showGameForm, setShowGameForm] = useState([])
    const [playerName, setPlayerName] = useState()
    const [publicGame, setPublicGame] = useState(false)
    const [userAge, setUserAge] = useState()


    const navigate = useNavigate();

    const getMyGames = async () => {
        try {
            const response = await api.get("profiles/")
            setMyGames(response.data)
            const user_response = await api.get("users/info/")
            setUserAge(user_response.data.age)
            for (let game in response.data) {
                setShowGameForm(prevForms => [...prevForms, false])
            }
        } catch (err) {
            console.log(err)
        }
    }

    const editGame = (idx) => (e) => {
        setShowGameForm(prevForms => prevForms.map((prev, i) => (idx == i) ? !prev : prev))

    }
    const submitEdits = (profile_id) => async (e) => {
        e.preventDefault()
        const response = await api.put(`profiles/${profile_id}/`, { player_name: playerName, public: publicGame })
        setPlayerName("")
        setPublicGame(false)
        getMyGames()
    }

    const deleteGame = (profile_id) => async (e) => {
        const response = await api.delete(`profiles/${profile_id}/`)
        getMyGames()
        setShowGameForm(prevForms => prevForms.map(prev => false))
    }

    const goToGame = (game_name) => async (e) => {
        if (game_name.includes("Alone")) {
            navigate("/alone/")
        } else if (game_name.includes("Thyme")) {
            navigate("/thyme/")
        }
    }

    useEffect(() => {
        getMyGames()
    }, [])

    return (
        <div>
            {myGames.length > 0 && myGames.map((game, idx) => (
                <Card key={game.id} style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{game.game_name}</Card.Title>
                        <Card.Subtitle>{game.player_name}</Card.Subtitle>
                        <Card.Text>
                            {game.public ? "Public" : "Private"}
                        </Card.Text>
                        <Button onClick={goToGame(game.game_name)} variant="dark"><ThreeDots /></Button>
                        <Button onClick={editGame(idx)} variant="dark"><Pencil /></Button>
                        <Button onClick={deleteGame(game.id)} variant="dark"><Trash /></Button>
                        {showGameForm[idx] && <Form onSubmit={submitEdits(game.id)} >
                            <Form.Group className="mb-3" controlId="playerName">
                                <Form.Label>Player Name</Form.Label>
                                <Form.Control type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
                            </Form.Group>

                            {userAge > 13 && <Form.Group className="mb-3" controlId="publicCheck">
                                <Form.Check type="checkbox" label="Make Public" checked={publicGame} onChange={(e) => setPublicGame(e.target.checked)} />
                            </Form.Group>}
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>}
                    </Card.Body>
                </Card>
            ))}
        </div>

    );
}

export default MyGames;