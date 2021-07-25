import React from 'react';
import { DropdownButton, Dropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import reset from '../images/icons8-reset-96.png';

import "../styles/custom-dropdown.css"
import styles from "../styles/Controller.module.scss"
import pause_resume from "../images/play-and-pause-button.png"

import { useState } from 'react';
import { styled, Button } from '@material-ui/core';

import { BOGO_SORT, BUBBLE_SORT, COCKTAIL_SORT, GNOME_SORT, HEAP_SORT, INSERTION_SORT, INTRO_SORT, 
    MERGE_SORT, QUICK_SORT, QUICK_SORT_OPTIMIZED, SELECTION_SORT, SHELL_SORT, TIM_SORT } 
    from '../SortingVisualizer/SortingVisualizer';

import { RANDOM_ARRAY, STEADY_ARRAY, SORTED_ARRAY, REVERSE_SORTED_ARRAY, UNIFORM_ARRAY, PARTIAL_UNIFORM_ARRAY } from '../SortingVisualizer/SortingVisualizer';

import { MIN_ARRAY_SIZE, MAX_ARRAY_SIZE, BOGO_SORT_ARRAY_SIZE, INITIAL_ANIMATION_SPEED } from '../SortingVisualizer/SortingVisualizer';

import { SOLID_COLOR_SET, BOTTOM_GLOW_COLOR_SET, TOP_GLOW_COLOR_SET, HIGH_CONTRAST_COLOR_SET } from '../SortingVisualizer/colorSets';

export const buttonColor1 = "linear-gradient(0deg, #2057f0dd 10%, #0000 100%)"
export const buttonColorHover = "linear-gradient(0deg, #cc6d 20%, #0000 100%)"

export const StyledButton = styled(Button)({
    fontFamily: "Lato, sans-serif",
    fontWeight: "bold",
    fontSize: "17px",
    textAlign: "center",
    textTransform: "none",
    backgroundSize: "200% auto",
    transition: "0.25s ease-in",
    color: "#FFF",
    width: "140px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    cursor: "pointer",
    backgroundImage: buttonColor1,
    
    '&:hover':{
        backgroundImage: buttonColorHover,
    }
})

const SortButton = styled(StyledButton)({
    marginBottom: "10%",
})

const ResetButton = styled(StyledButton)({
    '&:hover':{
        backgroundImage: buttonColorHover,
    }
})

const PauseResumeButton = styled(StyledButton)({
    bottom: "0",
    '&:hover':{
        backgroundImage: buttonColorHover,
    }
})

export const Controller = (props) => {

    const [arrayType, setArrayType] = useState(STEADY_ARRAY);
    const [sortType, setSortType] = useState(QUICK_SORT);
    const [, setColorSet] = useState(TOP_GLOW_COLOR_SET);

    function changeArray(type){
        setArrayType(type);
        props.onChangeArray(type);
    };

    function changeSort(type){
        setSortType(type);
        props.onChangeSort(type);
    };

    function changeColor(colorSet) {
        setColorSet(colorSet);
        props.onChangeColor(colorSet);
    }

    return(
        <div className = {styles.container}>
            <div className = {styles.sliders}>
                <div className = {styles.sliderDropdown}>
                    <Typography gutterBottom className = {styles.dropdownTitle}>
                        Array
                    </Typography>
                    <DropdownButton id="dropdown-basic-button" className = "dropdown1" title={arrayType}>
                        <Dropdown.Item onClick = {() => changeArray(STEADY_ARRAY)}>{STEADY_ARRAY}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeArray(RANDOM_ARRAY)}>{RANDOM_ARRAY}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeArray(SORTED_ARRAY)}>{SORTED_ARRAY}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeArray(REVERSE_SORTED_ARRAY)}>{REVERSE_SORTED_ARRAY}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeArray(UNIFORM_ARRAY)}>{UNIFORM_ARRAY}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeArray(PARTIAL_UNIFORM_ARRAY)}>{PARTIAL_UNIFORM_ARRAY}</Dropdown.Item>
                    </DropdownButton>
                    <div onClick = {() => changeArray(arrayType)} className = {styles.resetButton}><img style = {{marginLeft: "0%"}} alt = "reset button" src = {reset} width = {27} height = {27}/></div>
                    <Typography gutterBottom className = {styles.sliderTitleArray}>
                        Array Size
                    </Typography>
                    <Slider
                        onChange = {(e, val) => {props.onChangeArraySize(val, arrayType)}}
                        defaultValue={(props.disableArraySizeSlider) ? BOGO_SORT_ARRAY_SIZE : MAX_ARRAY_SIZE}
                        valueLabelDisplay="auto"
                        disabled = {props.disableArraySizeSlider}
                        step={1}
                        min={MIN_ARRAY_SIZE}
                        max={MAX_ARRAY_SIZE}
                    />
                </div>
                <div className = {styles.sliderDropdown}>
                    <Typography gutterBottom className = {styles.dropdownTitle}>
                        Sort
                    </Typography>
                    <DropdownButton id="dropdown-basic-button" className = "dropdown1" title={sortType}>
                        <Dropdown.Header>Simple Sorting Algorithms</Dropdown.Header>
                        <Dropdown.Item onClick = {() => changeSort(BOGO_SORT)}>{BOGO_SORT}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeSort(BUBBLE_SORT)}>{BUBBLE_SORT}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeSort(COCKTAIL_SORT)}>{COCKTAIL_SORT}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeSort(GNOME_SORT)}>{GNOME_SORT}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeSort(INSERTION_SORT)}>{INSERTION_SORT}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeSort(SELECTION_SORT)}>{SELECTION_SORT}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeSort(SHELL_SORT)}>{SHELL_SORT}</Dropdown.Item>

                        <Dropdown.Header>Better Sorting Algorithms</Dropdown.Header>
                        <Dropdown.Item onClick = {() => changeSort(HEAP_SORT)}>{HEAP_SORT}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeSort(MERGE_SORT)}>{MERGE_SORT}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeSort(QUICK_SORT)}>{QUICK_SORT}</Dropdown.Item>

                        <Dropdown.Header>Hybrid/Optimized Sorting Algorithms</Dropdown.Header>
                        <Dropdown.Item onClick = {() => changeSort(QUICK_SORT_OPTIMIZED)}>Quick Sort (Optimized)</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeSort(INTRO_SORT)}>{INTRO_SORT}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeSort(TIM_SORT)}>{TIM_SORT}</Dropdown.Item>
                    </DropdownButton>
                    <Typography gutterBottom className = {styles.sliderTitleSorting}>
                        Sorting Speed
                    </Typography>
                    <Slider
                        onChange = {(e, val) => {props.onChangeSortSpeed(val)}}
                        defaultValue={INITIAL_ANIMATION_SPEED}
                        valueLabelDisplay="auto"
                        step={1}
                        min={1}
                        max={100}
                    />
                </div>
            </div>

            <div className = {styles.buttons}>
                <div className = {styles.topButton}>
                    <SortButton onClick = {() => {props.sort()}}>Sort!</SortButton>
                    <PauseResumeButton
                    onClick = {() => {props.pauseResume()}}><img width = {22} src = {pause_resume} alt = "Pause and Resume"/>
                    </PauseResumeButton>
                </div>
                <div className = {styles.bottomButton}>
                    <ResetButton onClick = {() => {props.reset()}}>Reset</ResetButton>               
                    <DropdownButton id = "dropdown-colors" title="Colors" style = {{marginTop: "10%"}}>
                        <Dropdown.Item onClick = {() => changeColor(SOLID_COLOR_SET)}>{SOLID_COLOR_SET}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeColor(BOTTOM_GLOW_COLOR_SET)}>{BOTTOM_GLOW_COLOR_SET}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeColor(TOP_GLOW_COLOR_SET)}>{TOP_GLOW_COLOR_SET}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeColor(HIGH_CONTRAST_COLOR_SET)}>{HIGH_CONTRAST_COLOR_SET}</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
        </div>
        
    )
}