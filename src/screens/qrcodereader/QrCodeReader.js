import React, {Component} from 'react';
import {
    Platform,
    StatusBar,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    PermissionsAndroid,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import {SafeAreaView} from 'react-navigation';
import Button from '../../components/buttons/Button';
import {Caption, Heading5, SmallText} from '../../components/text/CustomText';
import Icon from '../../components/icon/Icon';
import SizePicker from '../../components/pickers/SizePicker';
import TouchableItem from '../../components/TouchableItem';
import {CameraKitCameraScreen} from 'react-native-camera-kit';
import Colors from '../../theme/colors';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

/*
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    qrContainer: {
        marginTop: 200,
        width: width,
        alignSelf: 'stretch',
        height: 328,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 24,
        paddingBottom: 10,
    },
    productTitle: {
        fontWeight: '700',
    },
    pickerGroup: {
        marginTop: 24,
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    amountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    amountButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    quantity: {
        top: -1,
        paddingHorizontal: 20,
        fontSize: 18,
        color: Colors.black,
        textAlign: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.secondaryColor,
    },
    bottomButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 16,
        paddingHorizontal: 16,
    },
    buttonPriceContainer: {
        position: 'absolute',
        top: 0,
        left: 32,
        height: 48,
        justifyContent: 'center',
    },
    buttonPriceText: {
        fontSize: 16,
        lineHeight: 18,
        color: Colors.onPrimaryColor,
    },
});
*/

export default class QrCodeReader extends Component {

    constructor(props) {
        super(props);
        this.state = {

            QR_Code_Value: '',

            Start_Scanner: false,

        };
    }

    onQR_Code_Scan_Done = (QR_Code) => {

        this.setState({ QR_Code_Value: QR_Code });

        this.setState({ Start_Scanner: false });
    }

    open_QR_Code_Scanner=()=> {

        var that = this;

        if (Platform.OS === 'android') {
            async function requestCameraPermission() {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA, {
                            'title': 'Camera App Permission',
                            'message': 'Camera App needs access to your camera '
                        }
                    )
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                        that.setState({ QR_Code_Value: '' });
                        that.setState({ Start_Scanner: true });
                    } else {
                        alert("CAMERA permission denied");
                    }
                } catch (err) {
                    alert("Camera permission err", err);
                    console.warn(err);
                }
            }
            requestCameraPermission();
        } else {
            that.setState({ QR_Code_Value: '' });
            that.setState({ Start_Scanner: true });
        }
    }

    navigateTo = screen => () => {
        const {navigation} = this.props;
        navigation.navigate(screen);
    };

    render() {
        if (!this.state.Start_Scanner) {

            return (
                <View style={styles.MainContainer}>

                    <Text style={styles.QR_text}>
                        {this.state.QR_Code_Value ? 'Scanned QR Code: ' + this.state.QR_Code_Value : ''}
                    </Text>

                    {this.state.QR_Code_Value.includes("http") ?
                        <View style={styles.bottomButtonContainer}>
                            <Button
                                onPress={this.navigateTo('HomeNavigator')}
                                title={"Authenticate this Table".toUpperCase()}
                                height={48}
                                borderRadius={4}
                            />
                        </View> : null
                    }
                    <View style={styles.bottomButtonContainer}>
                        <Button
                            onPress={this.open_QR_Code_Scanner}
                            title={"QR Scanner".toUpperCase()}
                            height={48}
                            borderRadius={4}
                        />
                    </View>

                </View>
            );
        }
        return (
            <View style={{ flex: 1 }}>

                <CameraKitCameraScreen
                    showFrame={true}
                    scanBarcode={true}
                    laserColor={'#FF3D00'}
                    frameColor={'#00C853'}
                    colorForScannerFrame={'black'}
                    onReadCode={event =>
                        this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue)
                    }
                />

            </View>
        );
    }
}
const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    QR_text: {
        color: '#000',
        fontSize: 19,
        padding: 8,
        marginTop: 12
    },
    bottomButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 16,
        paddingHorizontal: 16,
        paddingTop: 15
    },
    button: {
        backgroundColor: '#2979FF',
        alignItems: 'center',
        padding: 12,
        width: 300,
        marginTop: 14
    },
});




