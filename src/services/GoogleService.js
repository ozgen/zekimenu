import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

class GoogleService {


  signIn = async (callback) => {
    try {
      GoogleSignin.configure({
        //It is mandatory to call this method before attempting to call signIn()
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        // Repleace with your webClientId generated from Firebase console
        webClientId: '333669437075-asv128buuhnmd1do5us5intf0i57lrq7.apps.googleusercontent.com',
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      return callback(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  isSignedIn = async (callback) => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    return callback(isSignedIn);
  };

  getCurrentUser = async (callback) => {
    const currentUser = await GoogleSignin.getCurrentUser();
    return callback(currentUser);
  };
}
export const googleService = new GoogleService();
