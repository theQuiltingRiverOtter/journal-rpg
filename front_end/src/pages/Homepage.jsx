import "../styles/homepage.css"

function HomePage() {
    return (
        <div className="homepage">
            <div className="front">
                <h1 className="title">Discover Your Next Adventure From the Comfort of Your Own Home</h1>
                <h3 className="subtitle">Explore Space. Embark on Magical Adventures. Investigate Underwater Realms.</h3>
                <button className="btn">Start Your Journey Now</button>
                <img src="/journal.jpg" alt="journal" className='backgroundImage' />
            </div>

        </div>
    );
}

export default HomePage;