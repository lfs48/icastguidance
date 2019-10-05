import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import * as monsterActions from '../../actions/entities/monsters_actions';
import {merge} from 'lodash';
import * as calcUtil from '../../util/calculations/calculations';

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
    const [actions, setActions] = useState([{name:"",type:"",body:""}]);

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
        const newTraits = merge([], traits);
        newTraits.push(["",""]);
        setTraits(newTraits);
    }

    //Remove a trait
    const removeTrait = (event, index) => {
        event.preventDefault();
        const newTraits = merge([], traits);
        newTraits.splice(index,1);
        setTraits(newTraits);
    }

    //Set values of actions
    const handleActionInput = (event, index, key) => {
        event.preventDefault();
        const newActions = merge([], actions);
        newActions[index][key] = event.target.value;
        setActions(newActions);
    }

    //Add an action
    const addAction = (event) => {
        event.preventDefault();
        const newActions = merge([], actions);
        newActions.push({name:"",type:"",body:""});
        setActions(newActions);
    }

    //Remove an action
    const removeAction = (event, index) => {
        event.preventDefault();
        const newActions = merge([], actions);
        newActions.splice(index,1);
        setActions(newActions);
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
            traits: traits,
            actions: actions
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
    const traitElements = traits.map((_, i) => 
            <div key={i} className="trait-container">
                <input
                    type="text"
                    placeholder="Name"
                    value={traits[i][0]}
                    onChange={e => handleTraitInput(e, i, 0)}
                ></input>
                <input
                    type="text"
                    placeholder="Description"
                    value={traits[i][1]}
                    onChange={e => handleTraitInput(e, i, 1)}
                ></input>
                <button onClick={e => removeTrait(e,i)}>X</button>
            </div>
    );

    //Generate action inputs
    const actionElements = actions.map((_,i) =>
        <div key={i} className="action-container">
            <input
                    type="text"
                    placeholder="Name"
                    value={actions[i]['name']}
                    onChange={e => handleActionInput(e, i, 'name')}
                ></input>
                <select
                    value={actions[i]['type']}
                    onChange={e => handleActionInput(e, i, 'type')}
                >
                    <option value="Attack">Attack</option>
                    <option value="Saving Throw">Saving Throw</option>
                    <option value="Nondamaging">Nondamaging</option>
                </select>
                <input
                    type="text"
                    placeholder="Description"
                    value={actions[i]['body']}
                    onChange={e => handleActionInput(e, i, 'body')}
                ></input>
                <button onClick={e => removeAction(e,i)}>X</button>
        </div>
    );

    const level = Math.max( Math.ceil(parseFloat(CR)), 1 );

    //Variables to assign elements logic-based css classes

        //Assign AC input field class based on how high it is
        let ACclass = "AC-normal";
        if (AC.length > 0) {
            if (calcUtil.hitChance(AC,level) < 0.5) {ACclass = "AC-slightly-too-high"};
            if (calcUtil.hitChance(AC,level) < 0.4) {ACclass = "AC-way-too-high"};
        }

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
                        className={ACclass}
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

                <section>
                    {actionElements}
                    <button onClick={e => addAction(e)}>Add Action</button>
                </section>

                <button
                    onClick={e => handleSubmit(e)}
                >
                    Submit
                </button>


            </form>

            <section>

                <span>{`Chance to hit this monster for a level ${level} party: ${(calcUtil.hitChance(AC,level)*100).toFixed(0)}%`}</span>

            </section>
        </div>
    );
}