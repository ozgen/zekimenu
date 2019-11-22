import React from 'react';
import FBSDK from 'react-native-fbsdk';

const {LoginButton, AccessToken, GraphRequest, GraphRequestManager, LoginManager} = FBSDK;

class FacebookService {
    constructor() {

    }

    handleFacebookLogin = async (navigation,callback) => {
        LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']).then(
            function (result) {
                if (result.isCancelled) {
                    console.log('Login cancelled');
                } else {
                    console.log('Login success with permissions: ' + result.grantedPermissions.toString());

                    const accessData = AccessToken.getCurrentAccessToken();
                    // Create a graph request asking for user information
                    const infoRequest = new GraphRequest('/me', {
                        accessToken: accessData.accessToken,
                        parameters: {
                            fields: {
                                string: 'id, email, picture.type(large)',
                            },
                        },
                    }, (error, result) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(result);
                            result.accessToken = AccessToken.getCurrentAccessToken();
                        }
                        return callback(error, result);
                    });
                    // Execute the graph request created above
                    new GraphRequestManager().addRequest(infoRequest).start();
                    //this.FBGraphRequest1('id, email, picture.type(large)', this.FBLoginCallback);
                }
            },
            function (error) {
                console.log('Login fail with error: ' + error);
            },
        );
    };

    async facebookLogin() {
        // native_only config will fail in the case that the user has
        // not installed in his device the Facebook app. In this case we
        // need to go for webview.
        let result;
        try {
            result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

        } catch (nativeError) {
            console.log(nativeError);
        }
        // handle the case that users clicks cancel button in Login view
        if (result.isCancelled) {

        } else {
            // Create a graph request asking for user information
            this.FBGraphRequest1('id, email, picture.type(large)', this.FBLoginCallback);
        }
    }

    async FBGraphRequest1(fields, callback) {
        const accessData = await AccessToken.getCurrentAccessToken();
        // Create a graph request asking for user information
        const infoRequest = new GraphRequest('/me', {
            accessToken: accessData.accessToken,
            parameters: {
                fields: {
                    string: fields,
                },
            },
        }, callback.bind(this));
        // Execute the graph request created above
        new GraphRequestManager().addRequest(infoRequest).start();
    }

    async FBLoginCallback(error, result) {
        if (error) {
            console.log(error);
        } else {
            // Retrieve and save user details in state. In our case with
            // Redux and custom action saveUser
            this.props.saveUser({
                id: result.id,
                email: result.email,
                image: result.picture.data.url,
            });
        }
    }

}

export const facebookService = new FacebookService();
