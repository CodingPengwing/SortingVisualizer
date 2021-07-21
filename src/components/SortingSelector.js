import React from 'react';
import { DropdownButton, Dropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../styles/Selector.module.scss"
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import "../styles/custom-dropdown.css"

import { useState } from 'react';
import { styled, Button } from '@material-ui/core';

import { BOGO_SORT, BUBBLE_SORT, COCKTAIL_SORT, GNOME_SORT, HEAP_SORT, INSERTION_SORT, INTRO_SORT, 
    MERGE_SORT, QUICK_SORT, QUICK_SORT_OPTIMIZED, SELECTION_SORT, SHELL_SORT, TIM_SORT } 
    from '../SortingVisualizer/SortingVisualizer';

import { RANDOM_ARRAY, STEADY_ARRAY, SORTED_ARRAY, REVERSE_SORTED_ARRAY, UNIFORM_ARRAY, PARTIAL_UNIFORM_ARRAY } from '../SortingVisualizer/SortingVisualizer';

const StyledButton = styled(Button)({
    marginRight: "5%",
    fontFamily: "monospace",
    fontSize: "17px",
    textAlign: "center",
    textTransform: "uppercase",
    backgroundSize: "200% auto",
    transition: "0.25s ease-in",
    color: "#FFF",
    width: "200px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    cursor: "pointer",
    backgroundImage: "linear-gradient(90deg, #00d2ff 0%, #3a7bd5 0%, #00d2ff 60%)",

    '&:hover':{
        backgroundPosition: "right bottom",
    }
})

const StyledButton2 = styled(StyledButton)({
    backgroundImage: "linear-gradient(90deg, #00d2ff 0%, #3a7bd5 0%, #00d2ff 60%)",
    '&:hover':{
        backgroundPosition: "right bottom",
    }
})

const PauseButton = styled(StyledButton)({
    backgroundImage: "linear-gradient(90deg, #00d2ff 0%, #3a7bd5 0%, #00d2ff 60%)",
    '&:hover':{
        backgroundPosition: "right bottom",
    }
})

const ResumeButton = styled(StyledButton)({
    backgroundImage: "linear-gradient(90deg, #00d2ff 0%, #3a7bd5 0%, #00d2ff 60%)",
    '&:hover':{
        backgroundPosition: "right bottom",
    }
})

// const buttonStyle = {marginBottom: "2%"}

export const Selector = (props) => {

    const [inputType, setInputType] = useState(STEADY_ARRAY);
    const [sortType, setSortType] = useState(QUICK_SORT);

    function changeInput(type){
        setInputType(type);
        props.onChangeInput(type);
    };

    function changeSort(type){
        setSortType(type);
        props.onChangeSort(type);
    };

    return(
        <div className = {styles.container}>
            <div className = {styles.sliders}>
                <div className = {styles.sliderDropdown}>
                    <Typography gutterBottom style = {{fontFamily: "monospace", color: "white", marginTop: "1%", marginRight: "4%"}}>
                        Array
                    </Typography>
                    <DropdownButton id="dropdown-basic-button" title={inputType} style = {{width: "53%"}}>
                        <Dropdown.Item onClick = {()=>changeInput(STEADY_ARRAY)}>{STEADY_ARRAY}</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeInput(RANDOM_ARRAY)}>{RANDOM_ARRAY}</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeInput(SORTED_ARRAY)}>{SORTED_ARRAY}</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeInput(REVERSE_SORTED_ARRAY)}>{REVERSE_SORTED_ARRAY}</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeInput(UNIFORM_ARRAY)}>{UNIFORM_ARRAY}</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeInput(PARTIAL_UNIFORM_ARRAY)}>{PARTIAL_UNIFORM_ARRAY}</Dropdown.Item>
                    </DropdownButton>
                    <Typography gutterBottom style = {{fontFamily: "monospace", color: "white", marginLeft: "4%", marginRight: "3%"} }>
                        Array Size
                    </Typography>
                    <Slider
                        onChange = {(e, val) => {props.onChangeSize(val, inputType)}}
                        defaultValue={(props.disableSlider)? 7 : 100}
                        valueLabelDisplay="auto"
                        disabled = {props.disableSlider}
                        step={1}
                        min={5}
                        max={100}
                    />
                </div>
                <div className = {styles.sliderDropdown}>
                    <Typography gutterBottom style = {{fontFamily: "monospace", color: "white", marginTop: "1%", marginRight: "5%"}}>
                        Sort
                    </Typography>
                    <DropdownButton id="dropdown-basic-button" title={sortType} style = {{width: "61%"}}>
                        <Dropdown.Item onClick = {()=>changeSort(BOGO_SORT)}>{BOGO_SORT}</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeSort(BUBBLE_SORT)}>{BUBBLE_SORT}</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeSort(COCKTAIL_SORT)}>{COCKTAIL_SORT}</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeSort(GNOME_SORT)}>{GNOME_SORT}</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeSort(HEAP_SORT)}>{HEAP_SORT}</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeSort(INSERTION_SORT)}>{INSERTION_SORT}</Dropdown.Item>
                        {/* <Dropdown.Item onClick = {()=>changeSort("Intro Sort")}>Intro Sort</Dropdown.Item> */}
                        <Dropdown.Item onClick = {()=>changeSort(MERGE_SORT)}>{MERGE_SORT}</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeSort(QUICK_SORT)}>{QUICK_SORT}</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeSort(QUICK_SORT_OPTIMIZED)}>Quick Sort (Optimized)</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeSort(SELECTION_SORT)}>{SELECTION_SORT}</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeSort(SHELL_SORT)}>{SHELL_SORT}</Dropdown.Item>
                        <Dropdown.Item onClick = {()=>changeSort(TIM_SORT)}>{TIM_SORT}</Dropdown.Item>
                    </DropdownButton>
                    <Typography gutterBottom style = {{fontFamily: "monospace", color: "white", marginRight: "2%"}}>
                        Sorting Speed
                    </Typography>
                    <Slider
                        onChange = {(e, val) => {props.onChangeSpeed(val)}}
                        defaultValue={100}
                        valueLabelDisplay="auto"
                        step={1}
                        min={1}
                        max={100}
                    />
                </div>
            </div>
            <div className = {styles.buttons}>
                <StyledButton style = {styles.buttonStyle} onClick = {() => { props.pause(); props.sort(); }}>Run</StyledButton>
                <PauseButton style = {styles.buttonStyle} onClick = {() => { props.pause(); }}>Pause</PauseButton>
                <ResumeButton style = {styles.buttonStyle} onClick = {() => { props.resume(); }}>Resume</ResumeButton>              
                <StyledButton2 style = {styles.buttonStyle} onClick = {() => { props.reset(); }}>Reset</StyledButton2>
            </div>
            
        </div>
    )
}
