import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createMonster} from '../../util/api/monsters_api_util';
import * as monsterActions from '../../actions/entities/monsters_actions';
import {merge} from 'lodash';

export default function MonsterForm() {

    const dispatch = useDispatch();

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
    const [langs, setLangs] = useState([]);
    const [skills, setSkills] = useState([]);
    const [traits, setTraits] = useState([["",""]]);

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

    //Set value of multiple selection select elements
    const handleMultiInput = (event, state, stateFunction) => {
        event.preventDefault();
        const newState = merge([], state);
        newState.push(event.target.value);
        stateFunction(newState);
    }

    //Set values of traits
    const handleTraitInput = (event, index, nameOrBody) => {
        event.preventDefault();
        const newTraits = merge([],traits);
        newTraits[index][nameOrBody] = event.target.value;
        setTraits(newTraits);
    }

    //Add a trait
    const addTrait = (event) => {
        event.preventDefault();
        const newTraits = merge([],traits);
        newTraits.push(["",""]);
        setTraits(newTraits);
    }

    //Submit form
    const handleSubmit = (event) => {
        event.preventDefault();

        const content = {
            AC: AC,
            HP: HP,
            speed: speed,
            stats: stats,
            langs: langs,
            skills: skills,
            traits: traits
        }
        
        const monster = {
            name: name,
            cr: CR,
            author: 1,
            type: type,
            content: JSON.stringify(content)
        }

        dispatch(monsterActions.createMonster(monster));
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

    //Generate language options
    const langNames = ["Abyssal", "Celestial", "Common", "Draconic", "Deep Speech", "Druidic", "Dwarvish", "Elvish", "Giant", "Gith", "Gnomish", "Goblin", "Halfling", "Infernal", "Orcish", "Primordial", "Sylvan", "Undercommon", "Thieves' Cant"];
    const langOptions = langNames.map((lang, i) => <option key={i} value={lang}>{lang}</option>)

    //Generate skill options
    const skillNames = ["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"];
    const skillOptions = skillNames.map((skill, i) => <option key={i} value={skill}>{skill}</option>)

    //Generate trait inputs
    const traitElements = traits.map((trait, i) => 
            <div key={i} className="trait-container">
                <input
                    type="text"
                    id={`trait-name-${i}`}
                    placeholder="Name"
                    value={traits[i][0]}
                    onChange={e => handleTraitInput(e, i, 0)}
                ></input>
                <input
                    type="text"
                    id={`trait-text-${i}`}
                    placeholder="Description"
                    value={traits[i][1]}
                    onChange={e => handleTraitInput(e, i, 1)}
                ></input>
            </div>
    );

    //Render
    return(
        <div id="monster-form-container">
            <form id="monster-form">

                <section>

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
                </section>

                <section>

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

                </section>

                <section id="monster-stats">
                    {statInputs}
                </section>

                <section>

                    <label
                        htmlFor="monster-skills-input"
                    >
                        Skills
                    </label>
                    <select
                        id="monster-skills-input"
                        value={skills}
                        multiple={true}
                        onChange={e => handleMultiInput(e, skills, setSkills)}
                    >
                        {skillOptions}
                    </select>

                    <label
                        htmlFor="monster-lang-input"
                    >
                        Languages
                    </label>
                    <select
                        id="monster-lang-input"
                        value={langs}
                        multiple={true}
                        onChange={e => handleMultiInput(e, langs, setLangs)}
                    >
                        {langOptions}
                    </select>

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

                </section>

                <section>

                    {traitElements}
                    <button onClick={e => addTrait(e)}>Add Trait</button>
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