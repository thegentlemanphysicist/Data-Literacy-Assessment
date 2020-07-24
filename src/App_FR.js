import React from 'react';
import Home from './Home';
import dictionary from './dictionaries/fr';

import HowDataLiterateAreYou from './content/fr/HowDataLiterateAreYou.md';
import Purpose from './content/fr/Purpose.md';
import WhoShouldUseThisAssessment from './content/fr/WhoShouldUseThisAssessment.md';

import AssessmentResults from './content/fr/AssessmentResults.md';
import DataPersona from './content/fr/DataPersona.md';
import DataLiteracyLevel from './content/fr/DataLiteracyLevel.md';

import FrontLine from './content/fr/personas/FrontLine.md';
import Analyst from './content/fr/personas/Analyst.md';
import DataScientist from './content/fr/personas/DataScientist.md';
import DataSteward from './content/fr/personas/DataSteward.md';
import IT from './content/fr/personas/IT.md';
import Executive from './content/fr/personas/Executive.md';

import Novice from './content/fr/literacyLevels/Novice.md';
import Apprentice from './content/fr/literacyLevels/Apprentice.md';
import Practitioner from './content/fr/literacyLevels/Practitioner.md';
import Expert from './content/fr/literacyLevels/Expert.md';

import NoviceCourses from './content/fr/courses/NoviceCourses.md';
import ApprenticeCourses from './content/fr/courses/ApprenticeCourses.md';
import PractitionerCourses from './content/fr/courses/PractitionerCourses.md';
import ExpertCourses from './content/fr/courses/ExpertCourses.md';

export default function App_FR() {
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