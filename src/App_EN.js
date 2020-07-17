import React, { useState, useEffect } from 'react';
import Home from './Home';
import dictionary from './dictionaries/en';
import HowDataLiterateAreYou from './content/en/HowDataLiterateAreYou.md';
import Purpose from './content/en/Purpose.md';
import WhoShouldUseThisAssessment from './content/en/WhoShouldUseThisAssessment.md';

export default function App_EN() {
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
