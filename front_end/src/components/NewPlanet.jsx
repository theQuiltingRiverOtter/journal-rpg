import { useEffect, useState, useRef } from "react"
import { api } from "../utilities";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "../styles/planetCards.css"
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';


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
    const [showModal, setShowModal] = useState(false);

    const myRef = useRef()
    const handleClose = () => setShowModal(false);

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
                setAntonyms(data.meta.ants)
            }
            setShowModal(true);

        } catch (err) {
            console.log(err)
            console.log("Error")
        }

    }

    const changeContent = (e) => {
        setContent(e.target.value)
    }

    const handleClick = (idx) => (e) => {
        setShowCards(prevCards => prevCards.map((prev, i) => (i == idx) ? true : false))
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

    const getCardImage = (location) => {
        const loc_file_dict = {
            "field": "/aloneCardFronts/field.jpg",
            "canyon": "/aloneCardFronts/canyon.jpg",
            "cliff": "/aloneCardFronts/cliff2.jpg",
            "desert": "/aloneCardFronts/desert.jpg",
            "Floating": "/aloneCardFronts/floating.jpg",
            "glacier": "/aloneCardFronts/glacier.jpg",
            "moon": "/aloneCardFronts/moon.jpg",
            "river": "/aloneCardFronts/river2.jpg",
            "snowy": "/aloneCardFronts/snowy.jpg",
            "treetop": "/aloneCardFronts/treetop5.jpg",
            "underground": "/aloneCardFronts/underground.jpg",
            "deep water": "/aloneCardFronts/underwater.jpg",
            "volcano": "/aloneCardFronts/volcano4.jpg"
        }
        for (let loc in loc_file_dict) {
            if (location.includes(loc)) {
                return loc_file_dict[loc]
            }
        }
    }

    return (
        <div className="newPlanet" >
            <h1>Planet {planetData.planet_name}</h1>
            <div className="prompts">
                {prompts && prompts.map((prompt, idx) => (

                    <div className="planetCards" key={idx}>
                        {showCards[idx] ?
                            <Card className="cardFront" text="white" onClick={handleClick(idx)}>
                                <div className="cardImageContainer">
                                    <Card.Img className="cardImage" src={getCardImage(prompt.location)}></Card.Img>
                                    <Card.Title className="cardLocation">{prompt.location}</Card.Title>




                                    <Accordion variant="dark" className="accordionOverlay">
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>{(prompt.how == "arduous") ? "After an arduous journey, you discover" : (prompt.how == "resting") ? "As you are resting, you spot" : "Suddenly, you come upon"} {prompt.what.split(":")[0]}</Accordion.Header>
                                            <Accordion.Body>
                                                {prompt.what.split(":")[1]}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>

                            </Card>
                            :
                            <div className={`cardBack ${showCards[idx] ? 'flipped' : ''}`} onClick={handleClick(idx)} >
                                <img className="cardBackImg" src={`/aloneCardBacks/${aloneCardBack}`} alt="Card Back" />
                            </div>

                        }
                    </div>

                ))}
            </div >
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="journal_entry">
                    <Form.Label>Ship's Log</Form.Label>
                    <div className="textAreaContainer">
                        <Form.Control as="textarea" className="textArea" ref={myRef} name="content" onChange={changeContent} value={content} rows={5} />
                        <div className="thesaurusBtn" onClick={lookUpText}><img className="thesaurusLogo" src="/thesaurus.png" /></div>
                    </div>
                </Form.Group>

                <Button className="journalBtn" type="submit" disabled={prompts.length > 0 ? false : true} >Submit Entry</Button>
            </Form>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Synonyms</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {synonyms.length > 0 && <Container className="thesaurusWords">
                        {synonyms.slice(0, 3).map((synList, idx) => (
                            <Col key={idx} xs={6} md={4}>
                                {synList.slice(0, 10).map((syn, ind) => (
                                    <p key={ind}>{syn}</p>
                                ))}
                            </Col>
                        ))}
                    </Container>}
                </Modal.Body>
                <Modal.Header>
                    <Modal.Title>Antonyms</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {antonyms.length > 0 && <Container className="thesaurusWords">
                        {antonyms.slice(0, 3).map((antList, idx) => (
                            <Col key={idx} xs={6} md={4}>
                                {antList.slice(0, 10).map((ant, ind) => (
                                    <p key={ind}>{ant}</p>
                                ))}
                            </Col>
                        ))}
                    </Container>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


        </div >
    )
}

export default NewPlanet