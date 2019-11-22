/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView
} from 'react-native';
import Button from "../../components/buttons/Button";
import Constants from '../../assets/Constants';

// import colors
import Colors from '../../theme/colors';
import ReelSet from '../../components/reelset/ReelSet';

// SearchA Config

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'black',

    },
    buttonContainer: {
        height: 100,
        width: Constants.MAX_WIDTH,
        backgroundColor: 'black',

    },
    playContainer: {
        height: 590 - 100,
        width: Constants.MAX_WIDTH,
        backgroundColor: 'black',

    },
    statusContainer:{
        height:Constants.MAX_HEIGHT-690,
        width:Constants.MAX_WIDTH,
        backgroundColor:'black'

    }
});

// SlotMachine
export default class SlotMachine extends Component {

    constructor(props) {
        super(props);
        this.reelSet = React.createRef();
    }

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.playContainer}>

                    <ReelSet ref={(ref) => {
                        this.reelSet = ref;
                    }}>

                    </ReelSet>
                </SafeAreaView>
                <View style={styles.buttonContainer}>
                    <Button title="Spin"  onPress={()=>{this.reelSet.spin()}}>

                    </Button>
                </View>
                <View style={styles.statusContainer}>

                </View>

            </View>
        );

    }

};

