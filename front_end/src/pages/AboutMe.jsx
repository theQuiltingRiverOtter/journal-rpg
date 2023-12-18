import { useState, useEffect } from "react";
import { api } from "../utilities";
import "../styles/aboutme.css"

function AboutMe() {
    const [userInfo, setUserInfo] = useState();
    const [goal, setGoal] = useState();

    const getUserInfo = async () => {
        const response = await api.get("users/info/")
        setUserInfo(response.data)
        let maxEntries = 0
        for (let game of response.data.game_profiles) {
            maxEntries = (game.entries.length > maxEntries) ? game.entries.length : maxEntries;
        }
        if (maxEntries < 100) {
            setGoal(100)
        } else if (maxEntries < 500) {
            setGoal(500)
        } else {
            setGoal(1000)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])


    return (
        <div>
            {userInfo && <div className="userContainer">
                <div className="userLeft">
                    <h3>{userInfo.display_name}</h3>

                </div>
                <div className="userRight">
                    <div className="information">
                        <h4 className="sectionTitle">Information</h4>
                        <div className="infoGroups">
                            <div>
                                <h6>Email</h6>
                                <p>{userInfo.email}</p>
                            </div>
                            <div>
                                <h6>Age</h6>
                                <p>{userInfo.age}</p>
                            </div>
                        </div>
                    </div>
                    <div className="games">
                        <h4 className="sectionTitle">Games</h4>
                        {userInfo && userInfo.game_profiles.length > 0 && userInfo.game_profiles.map(game => (
                            <div key={game.id}>
                                <h5>{game.game_name}: {game.entries.length} entries</h5>
                                <div className="progressBarContainer">
                                    <div className="progressBar" style={{ width: `${(game.entries.length / goal) * 100}%` }} />
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>}

        </div>

    );
}

export default AboutMe;