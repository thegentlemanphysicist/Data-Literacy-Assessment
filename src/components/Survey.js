import React, { useEffect } from 'react';
import * as SurveyJS from "survey-react";
import {cspsColours} from '../helpers';
import SurveyJSON from '../content/survey.json';
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
    model.locale = props.t.getLocale;

    function restartSurvey() {
        props.startSurvey(false);
    }

    function onComplete(result) {
        props.setSurveyResults(result.data);
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