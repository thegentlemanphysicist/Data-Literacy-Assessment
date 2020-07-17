import React from 'react';
import FIPBar from '../content/images/fipBar.png';
import FIPCanada from '../content/images/fipCanada.png';
import styles from './Footer.module.css';

export default function Footer(props) {

    return (
        <div className={styles.footer}>
            <img src={FIPBar} alt=""/>
            <img src={FIPCanada} alt=""/>
        </div>
    );
}