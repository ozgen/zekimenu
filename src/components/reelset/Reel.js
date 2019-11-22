import React, {Component} from 'react';
import {StyleSheet, View, Text, Animated, Easing} from 'react-native';
import Symbol from './Symbol';
import Constants from '../../assets/Constants';

const styles = StyleSheet.create({

    reel: {
        overflow: 'hidden',
    },

});

export default class Reel extends Component {


    constructor(props) {
        super(props);

        this.symbols = 'ABCDEFGHCCDDEAFGACFACAFFFA';
        this.reelSymbols = this.symbols.repeat(Constants.REEL_REPEAT).split('');
        this.symbolHeight = this.props.height / 3;

        this.symbolRefs = [];
        this.position = this.reelSymbols.length - 8;
        this.currentScrollPos = this.position * this.symbolHeight * -1;
        this.state = {
            scrollPos: new Animated.Value(this.currentScrollPos),
        };


    }

    highlightIndex = (idx, highlight) => {

        this.symbolRefs[this.position + idx].setActive(highlight);
    };

    scrollByOffset = (offset, callback) => {

        for (let i = 0; i < 3; i++) {
            this.symbolRefs[this.position + i].setActive(true);
        }
        this.currentScrollPos = this.currentScrollPos + (this.symbolHeight * offset);
        this.position = this.position - offset;
        Animated.timing(
            this.state.scrollPos,
            {
                toValue: this.currentScrollPos,
                duration: 750 + (this.props.index * 250),
                useNativeDriver: true,
                easing: Easing.inOut(Easing.exp),
            },
        ).start(() => {
            //repeat count 10=>>>>> 10 -2 = 8
            this.position = ((8 * this.symbols.length) + (this.position % this.symbols.length));
            let results = [];
            for (let i = 0; i < 3; i++) {
                this.symbolRefs[this.position + i].setActive(false);
                results.push(this.reelSymbols[this.position + i]);
            }
            this.currentScrollPos = this.position * this.symbolHeight * -1;
            this.state.scrollPos.setValue(this.currentScrollPos);

            callback(this.props.index, results);
        });
    };


    render() {
        return (
            <View style={[styles.reel, {width: this.props.width, height: this.props.height}]}>
                <Animated.View style={{
                    width: this.props.width,
                    height: this.reelSymbols.length * this.symbolHeight,
                    transform: [{translateY: this.state.scrollPos}],
                }}>
                    {this.reelSymbols.map((el, idx) => {
                        return <Symbol symbol={el} key={idx} index={idx}
                                       width={this.props.width}
                                       height={this.symbolHeight} ref={(ref) => {
                            this.symbolRefs[idx] = ref;
                        }
                        }>

                        </Symbol>;
                    })}
                </Animated.View>
            </View>
        );
    }
}
