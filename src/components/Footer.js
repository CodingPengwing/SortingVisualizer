import React from "react";
import styles from "../styles/Footer.module.scss";
import {AiOutlineGithub} from '@react-icons/all-files/ai/AiOutlineGithub';

export const Footer = (props) => {
    return(
        <footer className = {styles.footer}>
            <h3 className = {styles.author}>By: Tony & Ley</h3>
            <div className = {styles.brand}>  
                2021 © sortify.io. All Rights Reserved.          
            </div>
            <div className = {styles.icons}>
                <a href ="https://github.com/ilaylow" target="_blank" rel="noopener noreferrer"><AiOutlineGithub size = {40} style = {{marginRight: "2.5%"}}/></a>
                <a href = "https://github.com/CodingPengwing" target="_blank" rel="noopener noreferrer"><AiOutlineGithub size = {40}/></a>
            </div>
        </footer>
    )
}