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
import {RNCamera} from 'react-native-camera';
import Colors from '../../theme/colors';


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

    barcodeRecognized = ({ barcodes }) => {
        barcodes.forEach(barcode => console.warn(barcode.data));
        //todo change state and add barcode here
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

               {/* <CameraKitCameraScreen
                    showFrame={true}
                    scanBarcode={true}
                    laserColor={'#FF3D00'}
                    frameColor={'#00C853'}
                    colorForScannerFrame={'black'}
                    onReadCode={event =>
                        this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue)
                    }
                />*/}
                <RNCamera
                  ref={ref => {
                      this.camera = ref;
                  }}
                  style={{
                      flex: 1,
                      width: '100%',
                  }}
                  onGoogleVisionBarcodesDetected={this.barcodeRecognized}
                >
                </RNCamera>

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




