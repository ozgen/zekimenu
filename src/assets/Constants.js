import {Dimensions} from 'react-native';

export default {

    MAX_WIDTH: Dimensions.get('screen').width,
    MAX_HEIGHT: Dimensions.get('screen').height,
    REEL_REPEAT: 10,
    REEL_SYMBOLS: [
        'ABCDEFGHCCDDEAFGACFACAFFFA',
        'BACDEFGGGHAAFDHHAAASDCEEED',
        'CDEAABBFGHHFAEEEFFFACCDEBA',
    ],
    LINES: [
        [
            [0, 1], [1, 1], [2, 1], [3, 1],
            [0, 0], [1, 0], [2, 0], [3, 0],
            [0, 2], [1, 2], [2, 2], [3, 2],
        ],
    ],
};
