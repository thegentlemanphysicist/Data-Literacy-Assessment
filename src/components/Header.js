import React from 'react';
import DiscoverDataLogo from '../content/images/discoverDataLogo.png';
import CSPSLogo from '../content/images/cspsLogo.png';
import styles from './Header.module.css';

export default function Header(props) {

    return (
        <div className={styles.header}>
            <img src={DiscoverDataLogo} alt=""/>
            <img src={CSPSLogo} alt=""/>
        </div>
    );
}