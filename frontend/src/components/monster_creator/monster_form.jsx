import React, {useState} from 'react';

export default function MonsterForm() {
    const [name, setName] = useState("");
    const [CR, setCR] = useState("0");
    const [AC, setAC] = useState("");
    const [HP, setHP] = useState("");

    const handleInput = (event, stateFunction) => {
        event.preventDefault();
        stateFunction(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    
    const options = Array(30).fill().map((_, i) => <option key={i+4} value={`${i+1}`}>{i+1}</option>);
    return(
        <div id="monster-form-container">
            <form id="monster-form">
                <label
                    htmlFor="monster-name-input"
                >
                    Name
                </label>
                <input
                    id="monster-name-input"
                    type="text"
                    value={name}
                    onChange={e => handleInput(e, setName)}
                ></input>
                <label
                    htmlFor="monster-CR-input"
                >
                    CR
                </label>
                <select
                    id="monster-CR-input"
                    value={CR}
                    onChange={e => handleInput(e, setCR)}
                >
                    <option key={0} value="0">0</option>
                    <option key={1} value="1/8">1/8</option>
                    <option key={2} value="1/4">1/4</option>
                    <option key={3} value="1/2">1/2</option>
                    {options}
                </select>
                <label
                    htmlFor="monster-AC-input"
                >
                    AC
                </label>
                <input
                    id="monster-AC-input"
                    type="text"
                    value={AC}
                    onChange={e => handleInput(e, setAC)}
                ></input>
                <label
                    htmlFor="monster-HP-input"
                >
                    HP
                </label>
                <input
                    id="monster-HP-input"
                    type="text"
                    value={HP}
                    onChange={e => handleInput(e, setHP)}
                ></input>
                <button
                    onClick={e => handleSubmit(e)}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}