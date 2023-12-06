

function NewPlanet({ planetData }) {
    const [showCards, setShowCards] = useState([false])
    let prompts = []
    for (let prompt of planetData.prompts) {
        prompts.push(JSON.parse(prompt))
    }

    return (
        <div>
            <h1>Planet {planetData.planet_name}</h1>
            <h3>Prompts: {planetData.total_prompts}</h3>
            <div>
                {prompts && prompts.map((prompt, idx) => (
                    <div key={idx}>
                        <p>How: {prompt.how}</p>
                        <p>Location: {prompt.location}</p>
                        <p>What: {prompt.what}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewPlanet