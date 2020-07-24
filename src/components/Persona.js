import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import ReactMarkdown from 'react-markdown';
import { getMarkdown, markdownLinkRenderer } from '../helpers';
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
    const [courseMD, setCourseMD] = useState(null);

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
        getMarkdown(props.markdown.courses[level.title.replace(/\s/g, '') + "Courses"], setCourseMD);
    }

    function saveAsPDF() {
        let root = document.getElementById("root");

        let options = {
            filename: props.t["Data Literacy and Persona Assessment"] + ".pdf",
            image: { type: 'jpeg', quality: 0.98 },
            pagebreak: {
                mode: 'avoid-all'
            }
        };

        html2pdf().set(options).from(root).save();
    }

    return (
        <div className={styles.resultsPage}>
            <h1 className={styles.title}>{props.t["Assessment results"]}</h1>
            <ReactMarkdown source={assessmentResultsMD}/>
            <button className={styles.saveAsPDF + " light"} onClick={saveAsPDF}><i className="material-icons">cloud_download</i> {props.t["Download as pdf"]}</button>
            {persona && literacyLevel &&
                <React.Fragment>
                    <h2 className={styles.resultTypeHeading}>1. {props.t["Data Persona"]}</h2>
                    <div className={styles.resultBox}>
                        <div className={styles.emoji}>{persona.emoji}</div>
                        <div>
                            <h3>{props.t[persona.title].toUpperCase()}</h3>
                            <ReactMarkdown source={personaMD}/>
                        </div>
                    </div>
                    <ReactMarkdown source={aboutDataPersonaMD}/>
                    <h2 className={styles.resultTypeHeading}>2. {props.t["Data Literacy Level"]}</h2>
                    <div className={styles.resultBox}>
                        <div className={styles.emoji}>{literacyLevel.emoji}</div>
                        <div>
                            <h3>{props.t[literacyLevel.title].toUpperCase()}</h3>
                            <ReactMarkdown source={literacyLevelMD}/>
                        </div>
                    </div>
                    <ReactMarkdown source={aboutDataLiteracyLevelMD}/>
                    <h2 className={styles.resultTypeHeading}>3. {props.t["Proposed Curriculum"]}</h2>
                    <ReactMarkdown source={courseMD} renderers={{"link": markdownLinkRenderer}}/>
                </React.Fragment>
            }
        </div>
    );
}