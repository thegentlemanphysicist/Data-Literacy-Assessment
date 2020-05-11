import React, { useState, useEffect } from 'react';
import { GCFooter, GCHeader } from 'gc-tortilla';
import ReactMarkdown from 'react-markdown';
import { getMarkdown } from './helpers';
import './Home.css';

export default function Home(props) {

    const [intro, setIntro] = useState(null);

    useEffect(() => {
        setIntro(getMarkdown(props.intro, setIntro));
    },[]);

    return (
        <div className="home">
            <GCHeader/>
            <ReactMarkdown source={intro}/>
            <GCFooter theme="light"/>
        </div>
    );
}