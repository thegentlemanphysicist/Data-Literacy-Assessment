import React from 'react';
import * as SurveyJS from "survey-react";
import SurveyJSON from '../content/survey.json';
import "survey-react/survey.css";
import './Survey.css';

export default function Survey(props) {

    var model = new SurveyJS.Model(SurveyJSON);

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
                results[answer] = question.choices.indexOf(results[answer]) + 1;
            }

        }

        return results;
    }

    return (
        <SurveyJS.Survey
            model={model}
            onComplete={onComplete}
        />
    );
}