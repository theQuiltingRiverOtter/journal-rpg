import "../styles/homepage.css"
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Footer from "../components/Footer"

function HomePage() {
    return (
        <div className="homepage">
            <div className="top">
                <h1 className="title">Immerse Yourself in a New Adventure</h1>
                <h3 className="subtitle">Explore Space. Embark on Magical Adventures. Investigate Underwater Realms.</h3>
                <Button as={Link} to={"signup/"} variant="dark" className="loginBtn">Start Your Journey Now</Button>
                <img src="/journal.jpg" alt="journal" className='backgroundImage' />
            </div>
            <div className="middle">
                <h2>What is a Journaling Role Playing Game</h2>
                <p>Journaling roleplaying games are an innovative blend of journaling and traditional tabletop
                    roleplaying. Players take on the role of both storyteller and hero, navigating through a rich
                    setting and writing their own narratives. They offer the player the opportunity to delve into
                    fantastic realms, create compelling characters, and embark on epic quests. Journaling roleplaying
                    games unlock the creativity and imagination of the players using prompts to focus on characters,
                    emotions, and experiences.

                </p>
                <img className="writingImg" src="/writing.png" />

                <div className="cardSection">
                    <Card className="whatCards">
                        <Card.Body>
                            <Card.Img variant="top" src="/storytelling.png" />
                            <Card.Title>Immersive Storytelling</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Create and Live Out Adventures</Card.Subtitle>
                            <Card.Text>
                                Craft your own narrative through prompts and scenarios to shape the unfolding story. Each
                                journal becomes the canvas for an evolving story unique to your experiences and limited only
                                by the extent of your imagination.
                            </Card.Text>

                        </Card.Body>
                    </Card>


                    <Card className="whatCards">
                        <Card.Body>
                            <Card.Img variant="top" src="/dice.png" />
                            <Card.Title>Flexible Gameplay</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">No GM Required!</Card.Subtitle>
                            <Card.Text>
                                Cater to your schedule and preferences. Play at your own pace, pause whenever needed,
                                and resume your adventure whenever you're ready to continue your quest.
                            </Card.Text>

                        </Card.Body>
                    </Card>

                    <Card className="whatCards">
                        <Card.Body>
                            <Card.Img variant="top" src="/thinking.png" />
                            <Card.Title>Creative Expression</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Indulge Your Inner Writer</Card.Subtitle>
                            <Card.Text>
                                Nurture your creativity through character creation, world building, and storytelling.
                                Develop characters that resonate with your own identity and shape a world that reflects
                                your imagination.
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="middle2">
                <h3>What is QuillQuest</h3>
                <div className="cardSection">
                    <div className="aboutCard">
                        <img src="/dicepile.jpg" />
                        <h5>About Us</h5>
                        <p>
                            QuillQuest brings the magic of pen and paper journaling rpgs into the digital realm.
                            We've reimagined the traditional experience of cards and dice, blending it with the convenience
                            and accessibility of online platforms. It provides a space where the essence of each game is
                            preserved, allowing you to embark on epic quests, create captivating characters, and explore imaginative
                            realms, all from the comfort of your digital journal.
                        </p>
                    </div>
                    <div className="aboutCard">
                        <img src="/rpgTavern.jpg" />
                        <h5>Built for RolePlaying</h5>
                        <p>
                            QuillQuest is crafted as a haven for roleplaying enthusiasts seeking a unique blend of self-expression
                            and gaming adventure. With an array of adventures designed to inspire imagination, players can
                            delve into character development, chronicle emotions, and navigate epic quests. With rich settings and varied
                            prompts, each journal entry will become a page in your persona saga, allowing you quickly get your ideas down.
                        </p>
                    </div>

                </div>
            </div>
            <div className="bottom">
                <h1>Getting Started</h1>
                <div className="startedSection">
                    <div className="startedText">
                        <h3>1. Choose a Game</h3>
                        <p>Explore the games available and choose the one that best fits you.</p>
                        <h3>2. Create a Profile</h3>
                        <p>Every games starts with a player name, then you can create a profile for gameplay.</p>
                        <h3>3. Get Prompts</h3>
                        <p>Click the button to get the prompts for each game.</p>
                        <h3>4. Start Writing</h3>
                        <p>Write a journal entry based on the given prompt and click submit.</p>
                    </div>
                    <div className="startedImg">
                        <img src="/traveler.png" />
                    </div>
                </div>

            </div>
            <Footer className="footer" />
        </div>
    );
}

export default HomePage;