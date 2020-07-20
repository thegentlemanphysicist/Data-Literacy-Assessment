import React, { useState, useEffect } from 'react';
import personas from '../content/personas.json';
import dataLiteracyLevels from '../content/dataLiteracyLevels.json';
import './Persona.css';

export default function Persona(props) {

    const [persona, setPersona] = useState(null);
    const [literacyLevel, setLiteracyLevel] = useState(null);

    useEffect(() => {
        if (props.surveyResults){
            findPersona();
            findLiteracyLevel();
        }
    },[props.surveyResults])

    function findPersona() {
        let found;
        personas.forEach(persona => {
            let skillCount = 0;
            let skillsFound = 0;
            for (let skill in persona.skills){
                if (persona.skills[skill].includes(props.surveyResults[skill])){
                    skillsFound++;
                }
                skillCount++;
            }

            let personaPercentage = skillsFound / skillCount;

            if (!found || personaPercentage > found.personaPercentage){
                found = {
                    personaPercentage: personaPercentage,
                    ...persona
                };
            }

        });
        setPersona(found);
    }

    function findLiteracyLevel() {

        let score = 0;

        for (let skill in props.surveyResults){
            if (typeof(props.surveyResults[skill]) === "number"){
                score += props.surveyResults[skill];
            }
        }

        let level = dataLiteracyLevels.find(level => {
            if (score >= level.score.min && score <= level.score.max){
                return true;
            }
        })

        setLiteracyLevel(level);
    }
    

    return (
        <div>
            {persona &&
                <h1>{persona.title}</h1>
            }
            {literacyLevel &&
                <h1>{literacyLevel.title}</h1>
            }
        </div>
    );
}