import React, { useState, useEffect } from 'react';
import Home from './Home';
import dictionary from './dictionaries/fr';
import HowDataLiterateAreYou from './content/fr/HowDataLiterateAreYou.md';
import Purpose from './content/fr/Purpose.md';
import WhoShouldUseThisAssessment from './content/fr/WhoShouldUseThisAssessment.md';

export default function App_FR() {
    return (
        <Home
            t={dictionary}
            markdown={{
                HowDataLiterateAreYou,
                Purpose,
                WhoShouldUseThisAssessment
            }}
        />
    );
}