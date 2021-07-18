import React from 'react';
import { DropdownButton, Dropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../styles/Selector.module.scss"

import { useState } from 'react';
import { styled, Button } from '@material-ui/core';

const StyledButton = styled(Button)({
    marginLeft: "10%",
    fontFamily: "Arial Black, Gadget, sans-serif",
    fontSize: "20px",
    textAlign: "center",
    textTransform: "uppercase",
    transition: "0.5s",
    backgroundSize: "200% auto",
    color: "#FFF",
    boxRhadow: "0 0 20px #eee",
    borderRadius: "10px",
    width: "200px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    cursor: "pointer",
    display: "inline-block",
    borderRadius: "25px",
    backgroundImage: "linear-gradient(to right, #DD5E89 0%, #F7BB97 51%, #DD5E89 100%)",
})

export const Selector = (props) => {

    const [arrayType, setArrayType] = useState("Random");
    const [sortType, setSortType] = useState("Insertion Sort");

    function changeArray(type){
        setArrayType(type);
        props.onChange(type);
    };

    function changeSort(type){
        setSortType(type);
        props.onChangeSort(type);
    };

    return(
        <div className = {styles.selector}>
            <DropdownButton id="dropdown-basic-button" title={arrayType} style = {{marginRight: "10%"}}>
                <Dropdown.Item onClick = {()=>changeArray("Random")}>Random Array</Dropdown.Item>
                <Dropdown.Item onClick = {()=>changeArray("Sorted")}>Sorted Array</Dropdown.Item>
                <Dropdown.Item onClick = {()=>changeArray("Reverse Sorted")}>Reverse Sorted Array</Dropdown.Item>
            </DropdownButton>
            <DropdownButton id="dropdown-basic-button" title={sortType}>
                <Dropdown.Item onClick = {()=>changeSort("Insertion Sort")}>Insertion Sort</Dropdown.Item>
                <Dropdown.Item onClick = {()=>changeSort("Selection Sort")}>Selection Sort</Dropdown.Item>
                <Dropdown.Item onClick = {()=>changeSort("Bubble Sort")}>Bubble Sort</Dropdown.Item>
                <Dropdown.Item onClick = {()=>changeSort("Cocktail Sort")}>Cocktail Sort</Dropdown.Item>
                <Dropdown.Item onClick = {()=>changeSort("Quick Sort")}>Quick Sort</Dropdown.Item>
                <Dropdown.Item onClick = {()=>changeSort("Merge Sort")}>Merge Sort</Dropdown.Item>
                <Dropdown.Item onClick = {()=>changeSort("Heap Sort")}>Heap Sort</Dropdown.Item>
            </DropdownButton>
            <StyledButton onClick = {() => props.sort()}>Run</StyledButton>
        </div>
    )
}
