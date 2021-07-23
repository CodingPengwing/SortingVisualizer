import React from 'react';
import { DropdownButton, Dropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import reset from '../images/icons8-reset-96.png';

import "../styles/custom-dropdown.css"
import styles from "../styles/Selector.module.scss"

import { useState } from 'react';
import { styled, Button } from '@material-ui/core';

import { BOGO_SORT, BUBBLE_SORT, COCKTAIL_SORT, GNOME_SORT, HEAP_SORT, INSERTION_SORT, INTRO_SORT, 
    MERGE_SORT, QUICK_SORT, QUICK_SORT_OPTIMIZED, SELECTION_SORT, SHELL_SORT, TIM_SORT } 
    from '../SortingVisualizer/SortingVisualizer';

import { RANDOM_ARRAY, STEADY_ARRAY, SORTED_ARRAY, REVERSE_SORTED_ARRAY, UNIFORM_ARRAY, PARTIAL_UNIFORM_ARRAY } from '../SortingVisualizer/SortingVisualizer';

import { MIN_ARRAY_SIZE, MAX_ARRAY_SIZE, BOGO_SORT_ARRAY_SIZE, INITIAL_ANIMATION_SPEED } from '../SortingVisualizer/SortingVisualizer';

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

const PauseResumeButton = styled(StyledButton)({
    backgroundImage: "linear-gradient(90deg, #00d2ff 0%, #3a7bd5 0%, #00d2ff 60%)",
    '&:hover':{
        backgroundPosition: "right bottom",
    }
})

export const Selector = (props) => {

    const [arrayType, setarrayType] = useState(STEADY_ARRAY);
    const [sortType, setSortType] = useState(QUICK_SORT);

    function changeInput(type){
        setarrayType(type);
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
                    <Typography gutterBottom className = {styles.dropdownTitle}>
                        Array
                    </Typography>
                    <DropdownButton id="dropdown-basic-button" title={arrayType}>
                        <Dropdown.Item onClick = {() => changeInput(STEADY_ARRAY)}>{STEADY_ARRAY}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeInput(RANDOM_ARRAY)}>{RANDOM_ARRAY}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeInput(SORTED_ARRAY)}>{SORTED_ARRAY}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeInput(REVERSE_SORTED_ARRAY)}>{REVERSE_SORTED_ARRAY}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeInput(UNIFORM_ARRAY)}>{UNIFORM_ARRAY}</Dropdown.Item>
                        <Dropdown.Item onClick = {() => changeInput(PARTIAL_UNIFORM_ARRAY)}>{PARTIAL_UNIFORM_ARRAY}</Dropdown.Item>
                    </DropdownButton>
                    <div onClick = {() => changeInput(arrayType)} className = {styles.resetButton}><img style = {{marginLeft: "0%"}} alt = "reset button" src = {reset} width = {27} height = {27}/></div>
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
                    <DropdownButton id="dropdown-basic-button" title={sortType}>
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
                <StyledButton style = {styles.buttonStyle} onClick = {() => {props.sort()}}>Sort!</StyledButton>
                <PauseResumeButton style = {styles.buttonStyle} onClick = {() => {props.pauseResume()}}>Pause/Resume</PauseResumeButton>
                <StyledButton2 style = {styles.buttonStyle} onClick = {() => {props.reset()}}>Reset</StyledButton2>
            </div>

            <div className = {styles.sliderDropdown}>
                <Slider
                    onChange = {(e, val) => {props.onChangeSortCycle(val)}}
                    valueLabelDisplay="off"
                    defaultValue={1}
                    value={props.sortCycleValue}
                    disabled = {props.disableSortCycleSlider}
                    step={1}
                    min={1}
                    max={1000}
                />
            </div>
            <div>
                <StyledButton onClick={()=>props.stepBackward()}>Step Backward</StyledButton>
                <StyledButton onClick={()=>props.stepForward()}>Step Forward</StyledButton>
            </div>
            
        </div>
    )
}
