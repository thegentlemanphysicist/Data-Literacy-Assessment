import React, { useState, useEffect } from 'react';
import Home from './Home';
import dictionary from './dictionaries/fr';
import Introduction from './content/fr/Introduction.md';

export default function App_FR() {
    return (
        <Home t={dictionary} intro={Introduction}/>
    );
}