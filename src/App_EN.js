import React from 'react';
import Home from './Home';
import dictionary from './dictionaries/en';

import HowDataLiterateAreYou from './content/en/HowDataLiterateAreYou.md';
import Purpose from './content/en/Purpose.md';
import WhoShouldUseThisAssessment from './content/en/WhoShouldUseThisAssessment.md';

import AssessmentResults from './content/en/AssessmentResults.md';
import DataPersona from './content/en/DataPersona.md';
import DataLiteracyLevel from './content/en/DataLiteracyLevel.md';

import FrontLine from './content/en/personas/FrontLine.md';
import Analyst from './content/en/personas/Analyst.md';
import DataScientist from './content/en/personas/DataScientist.md';
import DataSteward from './content/en/personas/DataSteward.md';
import IT from './content/en/personas/IT.md';
import Executive from './content/en/personas/Executive.md';

import Novice from './content/en/literacyLevels/Novice.md';
import Apprentice from './content/en/literacyLevels/Apprentice.md';
import Practitioner from './content/en/literacyLevels/Practitioner.md';
import Expert from './content/en/literacyLevels/Expert.md';

import NoviceCourses from './content/en/courses/NoviceCourses.md';
import ApprenticeCourses from './content/en/courses/ApprenticeCourses.md';
import PractitionerCourses from './content/en/courses/PractitionerCourses.md';
import ExpertCourses from './content/en/courses/ExpertCourses.md';

export default function App_EN() {
    return (
        <Home
            t={dictionary}
            markdown={{
                HowDataLiterateAreYou,
                Purpose,
                WhoShouldUseThisAssessment,
                AssessmentResults,
                DataPersona,
                DataLiteracyLevel,
                personas: {
                    FrontLine,
                    Analyst,
                    DataScientist,
                    DataSteward,
                    IT,
                    Executive
                },
                literacyLevels: {
                    Novice,
                    Apprentice,
                    Practitioner,
                    Expert
                },
                courses: {
                    NoviceCourses,
                    ApprenticeCourses,
                    PractitionerCourses,
                    ExpertCourses
                }
            }}
        />
    );
}
