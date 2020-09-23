import React, { useState, useEffect } from 'react';
import ChildLock from 'react-child-lock';
import { GCSplashScreen } from 'gc-tortilla';
import ReactMarkdown from 'react-markdown';
import { getMarkdown } from './helpers';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Survey from './components/Survey';
import Persona from './components/Persona';
import Footer from './components/Footer';
import styles from './Home.module.css';
import bg from './content/images/bg.png';

export default function Home(props) {

    const [startedSurvey, startSurvey] = useState(false);
    const [surveyResults, setSurveyResults] = useState(null);

    const [howDataLiterate, setHowDataLiterate] = useState(null);
    const [purpose, setPurpose] = useState(null);
    const [whoShouldUse, setWhoShouldUse] = useState(null);

    useEffect(() => {
        getMarkdown(props.markdown.HowDataLiterateAreYou, setHowDataLiterate);
        getMarkdown(props.markdown.Purpose, setPurpose);
        getMarkdown(props.markdown.WhoShouldUseThisAssessment, setWhoShouldUse);
    },[]);

    return (
        <div className={styles.home} style={{backgroundImage: `url(${bg})`}}>
            <ChildLock password="beta" background={{image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2252&q=80"}}/>
            <GCSplashScreen
                routes={{
                    english: "/Data-Literacy-Assessment/",
                    french: "/Data-Literacy-Assessment/fr"
                }}
                backgroundImage={"https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2252&q=80"}
            />
            <Header/>
            <Toolbar t={props.t} startedSurvey={startedSurvey}/>
            {!surveyResults &&
                <React.Fragment>
                    {!startedSurvey &&
                        <div className={styles.contentContainer}>
                            <h1>{props.t["Data Literacy and Persona Assessment"]}</h1>
                            <div className={styles.introContent}>
                                <div>
                                    <h2>{props.t["How Data Literate Are You?"]}</h2>
                                    <ReactMarkdown source={howDataLiterate}/>
                                </div>
                                <div>
                                    <h2>{props.t["Purpose"]}</h2>
                                    <ReactMarkdown source={purpose}/>
                                </div>
                                <div>
                                    <h2>{props.t["Who Should Use this Assessment"]}</h2>
                                    <ReactMarkdown source={whoShouldUse}/>
                                    <button onClick={() => startSurvey(true)}>{props.t["Start Assessment"]}</button>
                                </div>
                            </div>
                        </div>
                    }
                    {startedSurvey &&
                        <Survey t={props.t} setSurveyResults={setSurveyResults} startSurvey={startSurvey}/>
                    }
                </React.Fragment>
            }
            {surveyResults &&
                <Persona t={props.t} surveyResults={surveyResults} markdown={props.markdown}/>
            }
            <Footer/>
        </div>
    );
}