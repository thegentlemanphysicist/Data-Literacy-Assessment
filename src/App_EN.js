import React, { useState, useEffect } from 'react';
import Home from './Home';
import dictionary from './dictionaries/en';
import Introduction from './content/en/Introduction.md';

export default function App_EN() {
    return (
        <Home t={dictionary} intro={Introduction}/>
    );
}
