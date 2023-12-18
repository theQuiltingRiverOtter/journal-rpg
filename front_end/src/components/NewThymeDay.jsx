import { useState, useEffect, useRef } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { api } from "../utilities"
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


const cardBacks = ["thymeCardBack.jpg", "thymeCardBack2.jpg", "thymeCardBack3.png",
    "thymeCardBack4.jpg", "thymeCardBack5.jpg", "thymeCardBack6.jpg",
    "thymeCardBack7.jpg", "thymeCardBack8.jpg", "thymeCardBack9.jpg", "thymeCardBack10.jpg", "thymeCardBack11.jpg"]

const cardFronts = ["cinamon.png", "sage.png", "lavender.png", "thyme.png"]

function NewThymeDay({ dayData, thymeProfile, getGame }) {
    const [currentPrompt, setCurrentPrompt] = useState()
    const [currentIdx, setCurrentIdx] = useState()
    const [prompts, setPrompts] = useState([])
    const [showCards, setShowCards] = useState(new Array(dayData.prompts.length).fill(false))
    const [content, setContent] = useState()
    const [synonyms, setSynonyms] = useState([])
    const [antonyms, setAntonyms] = useState([])
    const [thymeCardBack, setThymeCardBack] = useState(cardBacks[Math.floor(Math.random() * cardBacks.length)])
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);


    const myRef = useRef()

    useEffect(() => {
        if (dayData.prompts) {
            setPrompts(dayData.prompts)
            setShowCards(new Array(dayData.prompts.length).fill(false))
        }
        setThymeCardBack(cardBacks[Math.floor(Math.random() * cardBacks.length)])
    }, [dayData])

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
        setShowCards(prevCards => prevCards.map((prev, i) => i === idx ? !prev : false));
        setCurrentPrompt(prompts.filter((prompt, i) => i === idx));
        setCurrentIdx(idx);
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        setPrompts(prevPrompts => prevPrompts.filter((prev, i) => i !== currentIdx))
        setShowCards(prevCards => prevCards.map(prev => false))
        const response = await api.post(`thyme/${thymeProfile[0].id}/day/${dayData.day}/new_entry/`, { content: content, prompt: currentPrompt })
        setContent("")
        getGame()
    }

    const titleCase = (sentence) => {
        let newStringList = [];
        const articles = ["a", "an", "the", "or"]
        let sentenceList = sentence.split(" ")
        for (let i = 0; i < sentenceList.length; i++) {
            if (articles.includes(sentenceList[i]) && i != 0) {
                newStringList.push(sentenceList[i])
            } else {
                newStringList.push(sentenceList[i][0].toUpperCase() + sentenceList[i].slice(1))
            }
        }
        return newStringList.join(" ")
    }

    return (
        <div className="newDay">
            <div className="dayCards">


                {prompts && prompts.map((prompt, idx) => (


                    <div key={idx} >


                        {showCards[idx] ?
                            <Card className={`cardFrontThyme ${showCards[idx] ? "flipped" : ''}`}>
                                <Card.Body>
                                    <Card.Text>{titleCase(prompt.split(" - ")[0])} </Card.Text>
                                    <Card.Img className="cardFrontImage" src={`/thymeCardFront/${(prompt.includes("mystery") ? "sage.png" : (prompt.includes("unexpected")) ? "thyme.png" : "cinamon.png")}`}></Card.Img>
                                    <Card.Text>{titleCase(prompt.split(" - ")[1])}</Card.Text>
                                </Card.Body>
                            </Card>
                            :
                            <div className={`cardBackThyme ${showCards[idx] ? "flipped" : ''}`} onClick={handleClick(idx)} >
                                <img src={`/thymeCardBacks/${thymeCardBack}`} alt="Card Back" />
                            </div>
                        }
                    </div>
                ))}
            </div>

            <div className="journal_entry">
                <Form onSubmit={handleSubmit} >
                    <Form.Group className="mb-3" controlId="journal_entry">
                        <Form.Label>Journal Entry</Form.Label>
                        <div className="textAreaContainer">
                            <Form.Control className="textArea" as="textarea" ref={myRef} name="content" value={content} onChange={changeContent} rows={4} />
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


            </div>

        </div >
    )
}


export default NewThymeDay;