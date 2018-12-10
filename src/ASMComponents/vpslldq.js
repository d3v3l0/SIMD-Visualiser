import React, {Component} from "react";
import * as Registry from "../Utils/Registry";
import Vector from "./Vector";
import * as _ from "lodash";
import anime from 'animejs';

const SHIFT_INDEX = 2;
const INPUT_INDEX = 1;
const OUTPUT_INDEX = 0;

export default class Vpslldq extends Component {

    constructor(props) {
        super(props);

        let registry = Registry.default;
        let shiftLen = (props.params[SHIFT_INDEX] * 8) / Registry.VAR_SIZE;
        let input = registry.get(props.params[INPUT_INDEX]);

        this.state = {
            type: "uint",
            bitWidth: 8,
            base: 16,
            shiftLen,
            input,
            output: [],
        };
        this.computeCommand();
    }

    getAnimation() {
        let laneLength = this.numbersRef.current.firstChild.width.baseVal.value;
        let timeline = anime.timeline({
            easing: "easeOutCubic",
            loop: false,
            autoplay: false
        });

        timeline
            .add({
                targets: this.numbersRef.current,
                translateX: () => -this.state.shiftLen * laneLength,
                duration: 2000,
                delay: 300
            });

        return timeline;
    }

    //Compute the command and set the registry.
    computeCommand() {
        let registry = Registry.default;
        let shiftLen = (this.props.params[SHIFT_INDEX] * 8) / Registry.VAR_SIZE;
        let input = registry.get(this.props.params[INPUT_INDEX]);
        let output = _.cloneDeep(input);
        output.push(...new Array(shiftLen).fill(0));
        output = output.slice(-input.length);
        registry.set(this.props.params[OUTPUT_INDEX], output);

        //this.setState({output, input, shiftLen});
    }

    render() {
        let {type, bitWidth, base, input} = this.state;

        return (
            <Vector type={type}
                    bitWidth={bitWidth}
                    base={base}
                    data={input}
                    numbersRef={(ref) => this.numbersRef = ref}/>
        );
    }
}