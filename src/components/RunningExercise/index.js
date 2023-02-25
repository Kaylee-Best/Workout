import React, { Component } from 'react';

export default class Stopwatch extends Component { //The stopwatch function also is a class so it can hold data
    constructor(props) {
        super(props);
        this.state = this.initialState = {
            isRunning: false,
            lapTimes: [],
            timeElapsed: 0,
        };
    }
    toggle = () => { //starts the timer
        this.setState({ isRunning: !this.state.isRunning }, () => {
            this.state.isRunning ? this.startTimer() : clearInterval(this.timer)
        });
    }
    lap = () => { //saves data for laps
        const { lapTimes, timeElapsed } = this.state;
        this.setState({ lapTimes: lapTimes.concat(timeElapsed) });
    }
    reset = () => { //resets the timer
        clearInterval(this.timer);
        this.setState(this.initialState);
    }
    startTimer () { //starts the timer
        this.startTime = Date.now();
        this.timer = setInterval(this.update, 10);
    }
    update = () => {
        const delta = Date.now() - this.startTime;
        this.setState({ timeElapsed: this.state.timeElapsed + delta });
        this.startTime = Date.now();
    }
    render() { //renders all the data 
        const { isRunning, lapTimes, timeElapsed } = this.state;
        return (
            <div>
                <h1>React Stopwatch</h1>
                <TimeElapsed id="timer" timeElapsed={timeElapsed} />
                <button onClick={this.toggle}>
                    {isRunning ? 'Stop' : 'Start'}
                </button>
                <button
                    onClick={isRunning ? this.lap : this.reset}
                    disabled={!isRunning && !timeElapsed}
                >
                    {isRunning || !timeElapsed ? 'Lap' : 'Reset'}
                </button>
                {lapTimes.length > 0 && <LapTimes lapTimes={lapTimes} />}
            </div>
        );
    }
}

const TimeElapsed = (props) => { //records the time 
    const getUnits = () => {
        const seconds = props.timeElapsed / 1000;
        return {
            min: Math.floor(seconds / 60).toString(),
            sec: Math.floor(seconds % 60).toString(),
            msec: (seconds % 1).toFixed(3).substring(2)
        };
    }
        const leftPad = (width, n) => {
            if ((n + '').length > width) {
                return n;
            }
            const padding = new Array(width).join('0'); //actually creates the times
            return (padding + n).slice(-width);
        };
        const units = getUnits();
        return (
            <div id={props.id}>
                <span>{leftPad(2, units.min)}:</span>
                <span>{leftPad(2, units.sec)}.</span>
                <span>{units.msec}</span>
            </div>
        );
}

const LapTimes = (props) => { //creates a table for the data
        const rows = props.lapTimes.map((lapTime, index) =>
            <tr key={++index}>
                <td>{index}</td>
                <td><TimeElapsed timeElapsed={lapTime} /></td>
            </tr>
        );
        return (
            <table id="lap-times">
                <thead>
                    <tr>
                        <th>Lap</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
}
// I followed a tutorial that can be found here: https://eleven-fifty-academy.gitbook.io/javascript-301-reactfundamentals/part-8-apps/1.0-small-timer-apps/1.3-stop-watch-app