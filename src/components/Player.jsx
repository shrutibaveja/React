import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    let playerContent = <span className="player-name">{playerName}</span>;

    function handleEditClick(){
        setIsEditing((editing)=> !editing);
        if(isEditing){
            onChangeName(symbol, playerName)
        }
        
    }

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    if(isEditing){
        playerContent = <input type="text" value={playerName} required onChange={handleChange}></input>
    }
    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                
                {playerContent}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}