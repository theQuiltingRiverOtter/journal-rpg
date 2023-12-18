import Card from 'react-bootstrap/Card';
import { useState } from 'react'

const cardBacks = ["thymeCardBack.jpg", "thymeCardBack2.jpg", "thymeCardBack3.png",
    "thymeCardBack4.jpg", "thymeCardBack5.jpg", "thymeCardBack6.jpg",
    "thymeCardBack7.jpg", "thymeCardBack8.jpg", "thymeCardBack9.jpg", "thymeCardBack10.jpg", "thymeCardBack11.jpg"]

const cardFronts = ["cinamon.png", "sage.png", "lavender.png", "thyme.png"]

function ThymeCard({ prompt }) {
    const [thymeCardBack, setThymeCardBack] = useState(cardBacks[Math.floor(Math.random() * cardBacks.length)])
    const [flip, setFlip] = useState(false)

    return (
        <div className={`thymeCard ${(flip) ? "flip" : ""}`} >

            <Card className="back" onClick={() => setFlip(!flip)}>
                <Card.Body>
                    <Card.Text>{prompt.split(" - ")[0]} </Card.Text>
                    <Card.Img className="cardFrontImage" src={`/thymeCardFront/${(prompt.includes("mystery") ? "sage.png" : (prompt.includes("unexpected")) ? "thyme.png" : "cinamon.png")}`}></Card.Img>
                    <Card.Text>{prompt.split(" - ")[1]}</Card.Text>
                </Card.Body>
            </Card>

            <div className="front" onClick={() => setFlip(!flip)} >  <img className="backImg" src={`/thymeCardBacks/${thymeCardBack}`} /></div>

        </div>
    )

}

export default ThymeCard;