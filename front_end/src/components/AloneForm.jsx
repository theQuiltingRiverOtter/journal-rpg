import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function AloneForm({ playerName, makeNewGameProfile, handleChange }) {

    return (
        <Form onSubmit={makeNewGameProfile}>
            <Form.Group className="mb-3" controlId="player_name">
                <Form.Label>Player Name</Form.Label>
                <Form.Control type="text" value={playerName} onChange={handleChange} />
                <Form.Text className="text-muted">
                    Input a player name for your ship captain.
                </Form.Text>
            </Form.Group>


            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default AloneForm;