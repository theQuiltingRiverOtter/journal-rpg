import { useEffect, useState, useRef } from "react"
import { api } from "../utilities";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "../styles/planetCards.css"
import Form from 'react-bootstrap/Form';


const cardBacks = ["aloneCardBack1.jpg", "aloneCardBack2.png", "aloneCardBack3.jpg",
    "aloneCardBack4.jpg", "aloneCardBack5.jpg", "aloneCardBack6.png",
    "aloneCardBack7.jpg", "aloneCardBack8.jpg", "aloneCardBack9.jpg", "aloneCardBack10.jpg", "aloneCardBack11.jpg",]

function NewPlanet({ planetData, getGame }) {
    const [showCards, setShowCards] = useState(new Array(planetData.prompts.length).fill(false))
    const [currentPrompt, setCurrentPrompt] = useState()
    const [prompts, setPrompts] = useState([])
    const [currentIdx, setCurrentIdx] = useState()
    const [content, setContent] = useState()
    const [synonyms, setSynonyms] = useState([])
    const [antonyms, setAntonyms] = useState([])
    const [aloneCardBack, setAloneCardBack] = useState(cardBacks[Math.floor(Math.random() * cardBacks.length)])

    const myRef = useRef()

    useEffect(() => {
        let temp_prompts = []
        for (let prompt of planetData.prompts) {
            temp_prompts.push(JSON.parse(prompt))
        }
        setPrompts(temp_prompts)
        setAloneCardBack(cardBacks[Math.floor(Math.random() * cardBacks.length)])
    }, [])

    const lookUpText = async () => {
        let textVal = myRef.current;
        let cursorStart = textVal.selectionStart;
        let cursorEnd = textVal.selectionEnd;
        let selectedText = content.substring(cursorStart, cursorEnd)
        try {
            const response = await api.get(`thesaurus/${selectedText}`)
            let data = response.data[0]
            if (typeof data != 'string') {
                setSynonyms(data.meta.syns)
                setAntonyms(data.meta.ants[0])
            }


        } catch (err) {
            console.log(err)
            console.log("Error")
        }

    }

    const changeContent = (e) => {
        setContent(e.target.value)
    }

    const handleClick = (idx) => (e) => {
        setShowCards(prevCards => prevCards.map((prev, i) => (i == idx) ? !prev : false))
        setCurrentPrompt(prompts.filter((prompt, i) => i == idx))
        setCurrentIdx(idx)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setPrompts(prevPrompts => prevPrompts.filter((prev, i) => i !== currentIdx))

        const response = await api.post(`alone/${planetData.id}/new_entry/`, { content: content, prompt: currentPrompt })
        setContent("")
        setShowCards(prevCards => prevCards.map(prev => false))
        setCurrentPrompt("")
        setCurrentIdx("")
        getGame()
    }

    return (
        <div className="newPlanet" >
            <h1>Planet {planetData.planet_name}</h1>
            <div className="prompts">
                {prompts && prompts.map((prompt, idx) => (

                    <div className="planetCards" key={idx}>
                        {showCards[idx] ?
                            <Card className="cardFront" onClick={handleClick(idx)}>
                                <Card.Body>How: {prompt.how}  </Card.Body>
                                <Card.Body>Location: {prompt.location}</Card.Body>
                                <Card.Body>What: {prompt.what}</Card.Body>
                            </Card>
                            :
                            <div className={`cardBack ${showCards[idx] ? 'flipped' : ''}`} onClick={handleClick(idx)} >
                                <img src={`/aloneCardBacks/${aloneCardBack}`} alt="Card Back" />
                            </div>

                        }
                    </div>

                ))}
            </div >
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="journal_entry">
                    <Form.Label>Ship's Log</Form.Label>
                    <Form.Control as="textarea" ref={myRef} name="content" onChange={changeContent} value={content} rows={3} />
                </Form.Group>
                <Button onClick={lookUpText}>Thesaurus</Button>
                <Button className="journalBtn" type="submit" disabled={prompts.length > 0 ? false : true} >Submit Entry</Button>
            </Form>
            {synonyms.length > 0 && <div>
                {synonyms.slice(0, 10).map((synList, idx) => (
                    <ul key={idx}>{synList.map(syn => (
                        <li>{syn}</li>
                    ))}</ul>
                ))}
            </div>}

        </div >
    )
}

export default NewPlanet