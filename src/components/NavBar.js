import React from "react";
import styles from '../styles/NavBar.module.scss';
import { styled } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import {AiOutlineGithub} from '@react-icons/all-files/ai/AiOutlineGithub';
import { WelcomeHeader } from './WelcomeHeader';

export const Bar = (props) => {
    return(
        <div className = {styles.navbar}>     
            <h2 className = {styles.author}>By: Tony & Ley</h2>
            <WelcomeHeader/>
            <div className = {styles.icons}>
                <a href ="https://github.com/ilaylow"><AiOutlineGithub size = {55} style = {{marginRight: "2.5%"}}/></a>
                <a href = "https://github.com/CodingPengwing"><AiOutlineGithub size = {55}/></a>
            </div>
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