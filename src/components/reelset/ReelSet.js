import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Reel from './Reel';
import Constants from '../../assets/Constants';

const styles = StyleSheet.create({

    reelSet: {
        flex: 1,
        backgroundColor: 'orange',
        flexDirection: 'row',
    },

});

export default class ReelSet extends Component {


    constructor(props) {
        super(props);
        this.state = {
            width: null,
            height: null,
        };
        this.reels = [];
        this.reelsInMotion = null;
        this.spinResults = [];
        this.winnigLines = [];
    }

    onLayout = (e) => {
        this.setState({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
        });
    };
    renderReels = () => {
        let reelWidth = this.state.width / 4;
        let reelList = Array.apply(null, Array(4)).map((el, idx) => {
            return <Reel width={reelWidth} height={this.state.height} key={idx} index={idx} ref={(ref) => {
                this.reels[idx] = ref;
            }}>

            </Reel>;

        });

        return (
            <>
                {reelList}
            </>
        );

    };

    randomBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    spin = () => {
        this.reelsInMotion = 4;
        for (let i = 0; i < 4; i++) {
            this.reels[i].scrollByOffset(this.randomBetween(0, 7), (reelIdx, results) => {
                this.reelsInMotion -= 1;
                this.spinResults[reelIdx] = results;
                if (this.reelsInMotion === 0) {

                    this.evaluateResults();
                }
            });

        }
    };

    highlightWinningLines = (currentIndex) => {

        if (!this.winnigLines.length) {
            return;
        }

        if (currentIndex > 0) {

            /*  Constants.LINES[this.winnigLines[currentIndex - 1]].map((el) => {
                  this.reels[el[0]].highlightIndex(el[1], false);
              });
  */
        }

        if (currentIndex > this.winnigLines.length - 1) {
            return;
        }

        Constants.LINES[this.winnigLines[currentIndex]].map((el) => {
            this.reels[el[0]].highlightIndex(el[1], true);
        });

        setTimeout(() => {
            this.highlightWinningLines(currentIndex + 1);
        }, 1000);
    };

    evaluateResults = () => {
        console.log(this.spinResults);
        this.winnigLines = [];
        for (let lineIdx = 0; lineIdx < Constants.LINES.length; lineIdx++) {

            let streak = 0;
            let currentKind = null;

            for (let coordIdx = 0; coordIdx < Constants.LINES[lineIdx]; coordIdx++) {

                let coord = Constants.LINES[lineIdx][coordIdx];
                let symAtCoords = this.spinResults[coord[0]][coord[1]];

                if (coordIdx === 0) {
                    currentKind = symAtCoords;
                    streak += 1;
                } else {
                    if (symAtCoords !== currentKind) {
                        break;
                    }
                    streak += 1;
                }
            }
            if (streak >= 3) {
                this.winnigLines.push(lineIdx);
                console.log(this.winnigLines);
            }

        }

        this.highlightWinningLines(0);
    }

    render() {
        return (
            <View style={styles.reelSet} onLayout={this.onLayout}>

                {this.state.width && this.state.height && this.renderReels()}

            </View>
        );
    }
}
