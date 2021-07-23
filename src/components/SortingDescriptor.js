import React from "react";
import styles from "../styles/descriptor.module.scss";
import dropdown_arrow from "../images/down-arrow-blue.png"
import SlideToggle from "react-slide-toggle";

export default class Description extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
        }
        this.boxClicked = this.boxClicked.bind(this);
    }

    boxClicked(){
        this.setState({visible: !this.state.visible})
    }

    render(){
        return(
            <div>
                <SlideToggle duration = {500} collapsed
                render = {({toggle, setCollapsibleElement, progress}) => (
                    <div>
                        <div className = {styles.question}>
                            <span onClick = {toggle} style = {{fontSize: "180%", color: "white", fontFamily: "Lato", fontWeight: "lighter"}}>{this.props.header}</span>
                            <img onClick = {toggle} src = {dropdown_arrow} alt = "Dropdown arrow"/>
                        </div>
                        <div ref={setCollapsibleElement}>
                            <div className = {styles.answer}>
                                <h3>{this.props.description}</h3>
                            </div>
                        </div>
                    </div>
                )}>
                </SlideToggle>
            </div>
        )
    }
}