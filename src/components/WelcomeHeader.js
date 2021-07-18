import React from "react";
import styles from "../styles/App.module.scss"
import FadeIn from 'react-fade-in';
console.log(styles)

export const WelcomeHeader = (props) => {
    return(
        <div className = {styles.welcomediv}>
            <FadeIn delay = {300}>
                <h1 className = {styles.welcome}>Welcome To</h1>
                <h1 className = {styles.welcome2}>sortify.io</h1> 
            </FadeIn>
        </div>
    )
}