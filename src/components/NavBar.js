import React from "react";
import styles from '../styles/NavBar.module.scss';
import { styled } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";

export const Bar = (props) => {
    return(
        <div className = {styles.navbar}>   
            <h1>sortify.io</h1>       
            <h2 className = {styles.author}>By: Tony & Ley</h2>    
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