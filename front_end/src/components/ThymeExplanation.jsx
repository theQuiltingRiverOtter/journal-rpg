import ThymeForm from "../components/ThymeForm";
import Button from 'react-bootstrap/Button';

function ThymeExplanation({ signedIn, newGame, setNewGame, makeNewGameProfile, playerName, handleChange }) {

    return (
        <div className="thymeExplanation">

            <img src="/cottage.png" />
            <div className="thymeText">
                <p> One Day at a Thyme, written by Jei D. Marcade and published in 2020, is a cozy, whimsical solo journaling game
                    in which you play the inhabitant of a cottage in a magical world. You can be a witch, wizard, or just
                    a lover of nature. Whoever you choose to be, your journal will delve into your responses to different activities,
                    people, objects, and events.
                </p>
                <p>The tabletop version of the game is played with a deck of cards and a six-sided die. To begin their journy, the
                    player rolls a die to determine the location of their homey, little cottage and write a journal entry describing it.
                    Each 'day', the player will roll the day to determine how many experiences they will have. Before flipping each card,
                    they roll the die again to determine what sort of encounter it is. The card suit determines if the experience involves
                    an activity, a neighbor, an item, or an event. They then record a journal entry about the experience.
                </p>
                <p>QuillQuest simplifies their gameplay, providing random experiences and a place to store their journal entries. Players
                    can resume their game at anytime.
                </p>
                {signedIn && <Button variant="dark" onClick={e => setNewGame(!newGame)} >{(!newGame) ? "Start New Game" : "Close Form"}</Button>}
                {newGame && <ThymeForm makeNewGameProfile={makeNewGameProfile} playerName={playerName} handleChange={handleChange} />}
            </div>
        </div>
    )
}



export default ThymeExplanation;