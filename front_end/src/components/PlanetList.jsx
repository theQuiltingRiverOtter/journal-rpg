import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { Pencil, Trash } from "react-bootstrap-icons"
import Form from 'react-bootstrap/Form';
import { api } from "../utilities";

function PlanetList({ planets, getGame }) {
    const [showEditForm, setShowEditForm] = useState(new Array(planets.length).fill(false))
    const [planetName, setPlanetName] = useState("")
    const [entryContent, setEntryContent] = useState("")
    const [currentEntry, setCurrentEntry] = useState()
    const [showEntryEditForm, setShowEntryEditForm] = useState(false)

    useEffect(() => {
        setShowEditForm(planets.map(planet => false))
    }, [])

    const formatDate = (date) => {
        const newDate = new Date(date)
        const formattedDate = newDate.toISOString();
        return formattedDate
    }
    const submitEdits = (index, planet_id) => async (e) => {
        e.preventDefault();
        const response = api.put(`alone/${planet_id}/`, { planet_name: planetName })
        getGame()
        setPlanetName("")
        setShowEditForm(prevForm => prevForm.map((prev, i) => i == index ? !prev : prev))
    }

    const deletePlanet = (planet) => async (e) => {
        for (let entry of planet.entries) {
            const delete_entry_resp = await api.delete(`entries/${entry.id}`)
        }
        const response = await api.delete(`alone/${planet.id}/`)
        getGame();

    }

    const deleteEntry = (entry_id) => async (e) => {
        const response = await api.delete(`entries/${entry_id}/`)
        getGame()
    }

    const showForm = (index) => () => {

        setShowEditForm(prevForm => prevForm.map((prev, i) => i == index ? !prev : prev))
    }
    const editEntryForm = (entry_id, entry_content) => (e) => {
        if (!showEntryEditForm) {
            setCurrentEntry(entry_id)
            setEntryContent(entry_content)
            setShowEntryEditForm(true)
        } else {
            setCurrentEntry("")
            setEntryContent("")
            setShowEntryEditForm(false)
        }

    }
    const submitEntryEdits = (entry_id) => async (e) => {
        e.preventDefault()
        const response = await api.put(`entries/${entry_id}/`, { content: entryContent })
        setCurrentEntry("")
        setEntryContent("")
        setShowEntryEditForm(false)
        getGame()
    }

    return (
        <div>
            {planets.length > 0 && planets.map((planet, idx) => (
                <div key={planet.id} style={{ width: '18rem' }}>

                    <h3>Planet {planet.planet_name} <Pencil className='planetCrud' onClick={showForm(idx)} /> <Trash className="planetCrud" onClick={deletePlanet(planet)} />
                    </h3>
                    {showEditForm[idx] && <Form onSubmit={submitEdits(idx, planet.id)} >
                        <Form.Group className="mb-3" controlId="editPlanetForm">
                            <Form.Label>Planet Name</Form.Label>

                            <Form.Control type="text" rows={3} value={planetName} onChange={(e) => setPlanetName(e.target.value)} />
                        </Form.Group>
                        <Button type="submit" variant="dark">Submit Edits</Button>
                    </Form>}
                    {planet.entries.length > 0 && planet.entries.map(entry => (
                        <div className="entryCard" key={entry.id}>

                            <p><b>{formatDate(entry.posted_date)}:</b></p>
                            <p>{entry.content}</p>
                            <div className='crudBtns'>
                                <Pencil className="entryCrud" onClick={editEntryForm(entry.id, entry.content)} />
                                <Trash className="entryCrud" onClick={deleteEntry(entry.id)} />
                            </div>
                            {entry.id == currentEntry && <Form onSubmit={submitEntryEdits(entry.id)} >
                                <Form.Group className="mb-3" controlId="editEntryForm">

                                    <Form.Control as="textarea" rows={3} value={entryContent} onChange={(e) => setEntryContent(e.target.value)} />
                                </Form.Group>
                                <Button type="submit" variant="dark">Submit Edits</Button>
                            </Form>}
                        </div>

                    ))}

                </div>
            ))
            }
        </div >

    );
}

export default PlanetList;