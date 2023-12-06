import Card from 'react-bootstrap/Card';

function PlanetList({ planets }) {
    return (
        <div>
            {planets.length > 0 && planets.map(planet => (
                <Card key={planet.id} style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Planet {planet.planet_name}</Card.Title>

                        {planet.entries.length > 0 && planet.entries.map(entry => (
                            <Card.Text key={entry.id}>{entry.content}</Card.Text>
                        ))}

                    </Card.Body>
                </Card>
            ))}
        </div>

    );
}

export default PlanetList;