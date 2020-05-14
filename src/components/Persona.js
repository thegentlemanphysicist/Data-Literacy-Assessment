import React, { useState, useEffect } from 'react';
import personas from '../content/personas.json';
import './Persona.css';

export default function Persona(props) {

    const [persona, setPersona] = useState(null);

    useEffect(() => {
        if (props.surveyResults){
            findPersona();
        }
    },[props.surveyResults])

    function findPersona() {
        let found = personas.find(persona => {
            for (let skill in persona.skills){
                if (!persona.skills[skill].includes(props.surveyResults[skill])){
                    return false;
                }
            }
            return true
        });
        if (found){
            setPersona(found);
        }
        else{
            setPersona(findPersonaBackup());
        }
        
    }

    function findPersonaBackup() {
        return {
            title: "Need a backup"
        }
    }
    

    return (
        <div>
            {persona &&
                <h1>{persona.title}</h1>
            }
        </div>
    );
}