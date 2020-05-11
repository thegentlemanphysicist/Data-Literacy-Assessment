import React, { useState, useEffect } from 'react';
import { GCFooter, GCHeader } from 'gc-tortilla';
import ReactMarkdown from 'react-markdown';
import { getMarkdown } from './helpers';
import Introduction from './content/en/Introduction.md';
import './Home.css';

export default function App() {

    const [introMarkdown, setIntroMarkdown] = useState(null);

    useEffect(() => {
        setIntroMarkdown(getMarkdown(Introduction, setIntroMarkdown));
    },[]);

    return (
        <div className="app">
            <GCHeader/>
            <ReactMarkdown source={introMarkdown}/>
            <GCFooter theme="light"/>
        </div>
    );
}