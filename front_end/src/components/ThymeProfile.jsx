import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';


function ThymeProfile({ houseDescription, setHouseDescription, homeLocation, createThymeProfile }) {
    const [imgSrc, setImgSrc] = useState("")

    const getImage = (location) => (e) => {
        let locationSplit = location.split(" ")
        let lastWord = locationSplit[locationSplit.length - 1]
        console.log(lastWord)
        const locationImages = {
            "woods":
                [
                    "/cottage/woods/woods1.jpg",
                    "/cottage/woods/woods2.jpg",
                    "/cottage/woods/woods3.jpg",
                    "/cottage/woods/woods4.jpg",
                    "/cottage/woods/woods5.jpg",
                    "/cottage/woods/woods6.jpg"
                ],
            "sea": [
                "/cottage/sea/sea1.jpg",
                "/cottage/sea/sea2.jpg",
                "/cottage/sea/sea3.jpg",
                "/cottage/sea/sea4.jpg",
                "/cottage/sea/sea5.jpg",
                "/cottage/sea/sea6.jpg",
                "/cottage/sea/sea7.jpg",

            ],
            "hill": [
                "/cottage/hill/hill1.jpg",
                "/cottage/hill/hill2.jpg",
                "/cottage/hill/hill3.jpg",
                "/cottage/hill/hill4.jpg",
                "/cottage/hill/hill5.jpg",
                "/cottage/hill/hill6.jpg",
                "/cottage/hill/hill7.jpg",
                "/cottage/hill/hill8.jpg",
                "/cottage/hill/hill9.jpg"
            ],
            "mountainside": [
                "/cottage/mountainside/mountainside1.jpg",
                "/cottage/mountainside/mountainside2.jpg",
                "/cottage/mountainside/mountainside3.jpg",
                "/cottage/mountainside/mountainside4.jpg",
                "/cottage/mountainside/mountainside5.jpg",
                "/cottage/mountainside/mountainside6.jpg",
                "/cottage/mountainside/mountainside7.jpg",
                "/cottage/mountainside/mountainside8.jpg"
            ],
            "swamp": [
                "/cottage/swamp/swamp1.jpg",
                "/cottage/swamp/swamp2.jpg",
                "/cottage/swamp/swamp3.jpg",
                "/cottage/swamp/swamp4.jpg",
                "/cottage/swamp/swamp5.jpg",
                "/cottage/swamp/swamp6.jpg",
                "/cottage/swamp/swamp7.jpg",
                "/cottage/swamp/swamp8.jpg"
            ],
            "desert": ["/cottage/desert/desert1.jpg", "/cottage/desert/desert2.jpg", "/cottage/desert/desert3.jpg", "/cottage/desert/desert4.jpg"]

        }
        console.log(lastWord)
        setImgSrc(locationImages[lastWord][Math.floor(Math.random() * 6)])

    }


    return (
        <div>
            <Form onSubmit={createThymeProfile}>
                <Form.Group className="mb-3" controlId="house_description">
                    <Form.Text className="text-muted">
                        Take a moment to envision your home, starting with the walk leading up to it. Which direction does the front
                        door face? How have you decorated the space just outside it. What sounds and scents drift toward you? Go inside.
                        What can you see from the doorway? How is the lighting? Picture your furniture and flooring. Do you have any knickknacks,
                        pets? If you are struggling to envision your home, try clicking "Get Image" to generate an image of a cottage in that location.
                    </Form.Text>
                    <br></br>
                    <Form.Label>{homeLocation}</Form.Label>
                    <Form.Control type="textarea" value={houseDescription} onChange={(e) => setHouseDescription(e.target.value)} />

                </Form.Group>
                <Button variant="dark" onClick={getImage(homeLocation)}>Get Image</Button>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {imgSrc && <img className="cottageImg" src={imgSrc} />}
        </div>
    );
}

export default ThymeProfile;