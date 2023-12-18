import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ThymeForm({ playerName, makeNewGameProfile, handleChange }) {

    return (
        <Form className="thymeForm" onSubmit={makeNewGameProfile}>
            <Form.Group className="mb-3" controlId="player_name">
                <Form.Label>Player Name</Form.Label>
                <Form.Control type="text" value={playerName} onChange={handleChange} />
                <Form.Text className="text-muted">
                    What is your inhabitant's name?
                </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default ThymeForm;