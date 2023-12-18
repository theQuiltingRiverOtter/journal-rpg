import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Pencil, Trash } from "react-bootstrap-icons"
import { useState } from 'react';
import { api } from "../utilities"

function ThymeEntry({ entry, getGame }) {
    const [entryText, setEntryText] = useState(entry.content)
    const [editForm, setEditForm] = useState(false)

    const deleteEntry = (entry_id) => async (e) => {
        const response = await api.delete(`entries/${entry_id}`)
        getGame()
    }

    const submitEdits = (entry_id) => async (e) => {
        e.preventDefault();
        const response = await api.put(`entries/${entry_id}/`, { content: entryText })
        getGame()
        setEditForm(false)
        getGame()
    }

    return (
        <div>
            <p >{entry.content}  <Pencil className="pencil" onClick={() => setEditForm(!editForm)} /> <Trash className="trash" onClick={deleteEntry(entry.id)} /></p>
            {editForm && <Form onSubmit={submitEdits(entry.id)}>
                <Form.Group className="mb-3" controlId={`editForm${entry.id}`}>
                    <Form.Text>{entry.prompt.slice(2, entry.prompt.length - 2)}</Form.Text>
                    <Form.Control as="textarea" rows={3} value={entryText} onChange={(e) => setEntryText(e.target.value)} />
                </Form.Group>
                <Button type="submit">Submit Edits</Button>
            </Form>}
        </div>
    )
}

export default ThymeEntry;