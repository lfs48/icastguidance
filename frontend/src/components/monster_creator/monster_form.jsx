import React from 'react';

export default function MonsterForm() {
    const options = Array(30).fill().map((_, i) => <option value={`${i+1}`}>{i+1}</option>);
    return(
        <div id="monster-form-container">
            <form id="monster-form">
                <label
                    for="monster-name-input"
                >
                    Name
                </label>
                <input
                    id="monster-name-input"
                    type="text"
                ></input>
                <label
                    for="monster-CR-input"
                >
                    CR
                </label>
                <select
                    id="monster-CR-input"
                >
                    <option value="0">0</option>
                    <option value="1/8">1/8</option>
                    <option value="1/4">1/4</option>
                    <option value="1/2">1/2</option>
                    {options}
                </select>
                <label
                    for="monster-AC-input"
                >
                    AC
                </label>
                <input
                    id="monster-AC-input"
                    type="text"
                ></input>
                <label
                    for="monster-HP-input"
                >
                    HP
                </label>
                <input
                    id="monster-HP-input"
                    type="text"
                ></input>
            </form>
        </div>
    );
}