import React, { useState, useEffect } from 'react';
import { GCFooter, GCHeader } from 'gc-tortilla';
import ChildLock from 'react-child-lock';
import ReactMarkdown from 'react-markdown';
import { getMarkdown } from './helpers';
import Survey from './components/Survey';
import Persona from './components/Persona';
import './Home.css';



export default function Home(props) {

    const [startedSurvey, startSurvey] = useState(false);
    const [intro, setIntro] = useState(null);
    const [surveyResults, setSurveyResults] = useState(null);

    useEffect(() => {
        setIntro(getMarkdown(props.intro, setIntro));
    },[]);

    console.log(surveyResults);

    return (
        <div className="home">
            {/* <ChildLock password="beta" background={{image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2252&q=80"}}/> */}
            <GCHeader/>
            {!surveyResults &&
                <React.Fragment>
                    {!startedSurvey &&
                        <div>
                            <ReactMarkdown source={intro}/>
                            <button onClick={() => startSurvey(true)}>{props.t["Start Assessment"]}</button>
                        </div>
                    }
                    {startedSurvey &&
                        <Survey t={props.t} setSurveyResults={setSurveyResults} startSurvey={startSurvey}/>
                    }
                </React.Fragment>
            }
            {surveyResults &&
                <Persona t={props.t} surveyResults={surveyResults}/>
            }
            <GCFooter theme="light"/>
        </div>
    );
}