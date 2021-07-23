import React from "react";
import styles from '../styles/NavBar.module.scss';
import { styled } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import { WelcomeHeader } from './WelcomeHeader';

export const Bar = (props) => {
    return(
        <div className = {styles.navbar}>     
            <WelcomeHeader/>
        </div>
    )
}

export const StyledButton = styled(Button)({
    color: "white",
    backgroundColor: "black",
    marginRight: "2.5%",
    marginTop: "2.5%",
    padding: "0.5% 2%",
    transition: "ease-in 0.2s",

    '&:hover': {
        backgroundColor: "white",
        color: "black",
    }
})