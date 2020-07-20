import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { getMarkdown } from '../helpers';
import personas from '../content/personas.json';
import dataLiteracyLevels from '../content/dataLiteracyLevels.json';
import styles from './Persona.module.css';

export default function Persona(props) {

    const [persona, setPersona] = useState(null);
    const [literacyLevel, setLiteracyLevel] = useState(null);

    const [assessmentResultsMD, setAssessmentResultsMD] = useState(null);
    const [aboutDataPersonaMD, setAboutDataPersonaMD] = useState(null);
    const [aboutDataLiteracyLevelMD, setAboutDataLiteracyLevelMD] = useState(null);
    const [personaMD, setPersonaMD] = useState(null);
    const [literacyLevelMD, setLiteracyLevelMD] = useState(null);

    useEffect(() => {
        if (props.surveyResults){
            findPersona();
            findLiteracyLevel();
        }

        getMarkdown(props.markdown.AssessmentResults, setAssessmentResultsMD);
        getMarkdown(props.markdown.DataPersona, setAboutDataPersonaMD);
        getMarkdown(props.markdown.DataLiteracyLevel, setAboutDataLiteracyLevelMD);

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

        getMarkdown(props.markdown.personas[found.title.replace(/\s/g, '')], setPersonaMD);
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

        getMarkdown(props.markdown.literacyLevels[level.title.replace(/\s/g, '')], setLiteracyLevelMD);
    }
    

    return (
        <div className={styles.resultsPage}>
            <h1>{props.t["Assessment results"]}</h1>
            <ReactMarkdown source={assessmentResultsMD}/>
            {persona && literacyLevel &&
                <React.Fragment>
                    <h2>{props.t["Data Persona"]}</h2>
                    <div className={styles.resultBox}>
                        <div className={styles.emoji}>{persona.emoji}</div>
                        <div>
                            <h3>{props.t[persona.title].toUpperCase()}</h3>
                            <ReactMarkdown source={personaMD}/>
                        </div>
                    </div>
                    <ReactMarkdown source={aboutDataPersonaMD}/>
                    <h2>{props.t["Data Literacy Level"]}</h2>
                    <div className={styles.resultBox}>
                        <div className={styles.emoji}>{literacyLevel.emoji}</div>
                        <div>
                            <h3>{props.t[literacyLevel.title].toUpperCase()}</h3>
                            <ReactMarkdown source={literacyLevelMD}/>
                        </div>
                    </div>
                    <ReactMarkdown source={aboutDataLiteracyLevelMD}/>
                </React.Fragment>
            }
        </div>
    );
}