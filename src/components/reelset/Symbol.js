import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Images from '../../assets/Images';

const styles = StyleSheet.create({

    reel: {
        backgroundColor: 'black',
        padding: 10,
    },

});

export default class Symbol extends Component {


    constructor(props) {
        super(props);

        this.state = {
            active: true,
        };

    }

    getImage = () => {
        switch (this.props.symbol) {
            case 'A':
                return Images.avacado;
                break;
            case 'B':
                return Images.banana;
                break;
            case 'C':
                return Images.brocoli;
                break;
            case 'D':
                return Images.cherry;
                break;
            case 'E':
                return Images.corn;
                break;
            case 'F':
                return Images.hamburger;
                break;
            case 'G':
                return Images.pineapple;
                break;
            case 'H':
                return Images.pizza;
                break;

        }
    };

    setActive = (active) => {

        this.setState({
            active: active,
        });
    };

    render() {
        let symbolSource = this.getImage();
        return (
            <View style={[styles.reel, {width: this.props.width, height: this.props.height}]}>
                <Image style={{
                    width: this.props.width - 20, height: this.props.height - 20,
                    opacity: this.state.active ? 1 : 0.3,
                }}
                       resizeMode="contain" source={symbolSource}>

                </Image>
            </View>
        );
    }
}
