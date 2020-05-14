import React, { useState, useEffect } from 'react';
import { GCFooter, GCHeader } from 'gc-tortilla';
import ReactMarkdown from 'react-markdown';
import { getMarkdown } from './helpers';
import Survey from './components/Survey';
import Persona from './components/Persona';
import './Home.css';



export default function Home(props) {

    const [intro, setIntro] = useState(null);
    const [surveyResults, setSurveyResults] = useState(null);

    useEffect(() => {
        setIntro(getMarkdown(props.intro, setIntro));
    },[]);

    console.log(surveyResults);

    return (
        <div className="home">
            <GCHeader/>
            {!surveyResults &&
                <Survey setSurveyResults={setSurveyResults}/>
            }
            {surveyResults &&
                <Persona t={props.t} surveyResults={surveyResults}/>
            }
            {/* <ReactMarkdown source={intro}/>
            <button>{props.t["Next"]}</button>*/}
            <GCFooter theme="light"/>
        </div>
    );
}