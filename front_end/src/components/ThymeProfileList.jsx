import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Pencil, Trash } from "react-bootstrap-icons"
import { useState, useEffect } from 'react';
import { api } from "../utilities"
import ThymeEntry from './ThymeEntry';

function ThymeProfileList({ thymeProfile, currentProfile, days, getGame, createDay, setHasGame }) {
    const [editForm, setEditForm] = useState(false)
    const [houseDescription, setHouseDescription] = useState("")


    const deleteProfile = (id) => async () => {
        const response = await api.delete(`thyme/${id}/`)
        getGame()

    }
    const deleteDay = (thyme_id, day) => async () => {
        for (let entry of day.entries) {
            const delete_day_resp = await api.delete(`entries/${entry.id}/`)
        }
        const response = await api.delete(`thyme/${thyme_id}/day/${day.id}`)
        getGame()
    }


    const submitEdits = (id) => async (e) => {
        e.preventDefault();
        const response = await api.put(`thyme/${id}/`, { house_description: houseDescription })
        getGame()
        setHouseDescription("")
        setEditForm(false)


    }
    return (
        <div className="profileSection">
            {thymeProfile.map(tp => (
                <div key={tp.id}>
                    <Button onClick={createDay(tp.id)}>New Day</Button>
                    <Button onClick={deleteProfile(tp.id)}><Trash /></Button>
                    <Button onClick={() => setEditForm(!editForm)}><Pencil /></Button>

                    <p>{tp.house_description}</p>
                    {editForm && <Form onSubmit={submitEdits(tp.id)} >
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>House Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={houseDescription} onChange={(e) => setHouseDescription(e.target.value)} />
                        </Form.Group>
                        <Button type="submit">Submit Edits</Button>
                    </Form>}
                    {currentProfile == tp.id && days.map(day => (
                        <div key={day.id}>
                            <h4>Day: {day.day} <Trash onClick={deleteDay(tp.id, day)} /></h4>
                            {day.entries && day.entries.length > 0 && day.entries.map(entry => (
                                <ThymeEntry key={entry.id} getGame={getGame} entry={entry} />

                            ))}
                        </div>

                    ))}
                </div>


            ))
            }

        </div >

    );
}

export default ThymeProfileList;

