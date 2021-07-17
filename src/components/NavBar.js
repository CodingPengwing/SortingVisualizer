import React from "react";
import '../styles/NavBar.css';
import { styled, withTheme } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";

export const Bar = (props) => {
    return(
        <div className = "navbar">   
            <h1>sortify.io</h1>
            <ul>         
                <h2 className = "author">By: Tony & Ley</h2>    
            </ul>
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