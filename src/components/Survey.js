import React, { useEffect } from 'react';
import ReactDOMServer from "react-dom/server";
import * as SurveyJS from "survey-react";
import {cspsColours} from '../helpers';
import SurveyJSON from '../content/survey.json';
import Decoration from '../content/images/decoration.png';
import './customSurveyJS.css';
import "survey-react/survey.css";
import styles from './Survey.module.css';

export default function Survey(props) {

    useEffect(() => {
        let button = document.createElement("button");
        button.innerHTML = props.t["Restart"];
        button.onclick = restartSurvey
        button.className = styles.restartButton + " light";

        document.querySelector(".sv_nav").appendChild(button);
    },[]);

    var defaultThemeColors = SurveyJS.StylesManager.ThemeColors["default"];

    defaultThemeColors["$main-color"] = cspsColours.grey;
    defaultThemeColors["$main-hover-color"] = cspsColours.purple;
    defaultThemeColors["$text-color"] = "black";
    defaultThemeColors["$body-container-background-color"] = "white";

    SurveyJS.StylesManager.applyTheme();

    var model = new SurveyJS.Model(SurveyJSON);

    function restartSurvey() {
        props.startSurvey(false);
    }

    function onComplete(result) {
        props.setSurveyResults(getSurveyScores(result.data, result.toJSON()));
    }

    function getQuestionArray(survey) {
        console.log(survey);
        let questions = [];
        survey.pages.forEach(page => {
            questions = questions.concat(page.elements);
        });
        return questions;
    }
    
    function getSurveyScores(results, survey) {

        let questions = getQuestionArray(survey);

        for (let answer in results){

            let question = questions.find(q => q.name === answer);

            if (question.type === "radiogroup"){
                results[answer] = question.choices.indexOf(results[answer]);
            }

        }

        return results;
    }

    return (
        <div className={styles.container}>
            {/* <div className={styles.decoration} style={{
                backgroundImage: `url(${Decoration})`
            }}/> */}
            <div className={styles.survey}>
                <SurveyJS.Survey
                    model={model}
                    onComplete={onComplete}
                />
            </div>
        </div>
    );
}