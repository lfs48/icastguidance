import React, {useState} from 'react';
import {createMonster} from '../../util/api/monsters_api_util';
import {merge} from 'lodash';

export default function MonsterForm() {

    //State variables & setter methods
    const [name, setName] = useState("");
    const [type, setType] = useState("Aberration");
    const [CR, setCR] = useState("0");
    const [AC, setAC] = useState("");
    const [HP, setHP] = useState("");
    const [speed, setSpeed] = useState(0);
    const [stats, setStats] = useState({
        STR: 10,
        DEX: 10,
        CON: 10,
        INT: 10,
        WIS: 10,
        CHA: 10
    });

    //Set value of input fields
    const handleInput = (event, stateFunction) => {
        event.preventDefault();
        stateFunction(event.target.value);
    };

    //Set value of stat inputs
    const handleStatInput = (event, stat) => {
        event.preventDefault();
        const newStats = merge({}, stats);
        newStats[stat] = event.target.value;
        setStats(newStats);
    }

    //Submit form
    const handleSubmit = (event) => {
        event.preventDefault();

        const content = {
            AC: AC,
            HP: HP,
            speed: speed,
            stats: stats
        }
        
        const monster = {
            name: name,
            cr: CR,
            author: 1,
            type: type,
            content: JSON.stringify(content)
        }

        createMonster(monster);
    }

    //Generate option elements with CR from 1 to 30
    const crs = Array(30).fill().map((_, i) => <option key={i+4} value={`${i+1}`}>{i+1}</option>);

    //Generate option elements for monster types
    const typeNames = ["Aberration", "Beast", "Celestial", "Construct", "Dragon", "Elemental", "Fey", "Fiend", "Giant", "Humanoid", "Monstrosity", "Ooze", "Plant", "Undead"];
    const types = typeNames.map((type,i) => <option key={i} value={type}>{type}</option>)

    //Generate stat blocks
    const statInputs = Object.keys(stats).map( (stat, i) => 
        <div key={i} className="stat-container">
            <label
            htmlFor={`monster-${stat}-input`}
            >
                {stat}
            </label>
            <input
                id={`monster-${stat}-input`}
                type="number"
                value={stats[stat]}
                onChange={e => handleStatInput(e,stat)}
            ></input>
            <span key={i}>{Math.floor((stats[stat]-10)/2)}</span>
        </div>
    );

    //Render
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
                    {crs}
                </select>

                <label
                    htmlFor="monster-type-input"
                >
                    Type
                </label>
                <select
                    id="monster-type-input"
                    value={type}
                    onChange={e => handleInput(e, setType)}
                >
                    {types}
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

                <label
                    htmlFor="monster-speed-input"
                >
                    Speed
                </label>
                <input
                    id="monster-speed-input"
                    type="number"
                    value={speed}
                    onChange={e => handleInput(e, setSpeed)}
                    step={5}
                ></input>

                <section id="monster-stats">
                    {statInputs}
                </section>

                <button
                    onClick={e => handleSubmit(e)}
                >
                    Submit
                </button>


            </form>
        </div>
    );
}