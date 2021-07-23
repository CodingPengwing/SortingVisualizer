import React from "react";
import styles from "../styles/App.module.scss"
import FadeIn from 'react-fade-in';

export const WelcomeHeader = (props) => {
    const scrollClick = () => {
        window.scrollBy(0, 69);
    }

    return(
        <div className = {styles.welcomediv}  onClick = {scrollClick}>
            <FadeIn delay = {300}>
                <h1 className = {styles.welcome2}>sortify.io</h1> 
            </FadeIn>
        </div>
    )
}