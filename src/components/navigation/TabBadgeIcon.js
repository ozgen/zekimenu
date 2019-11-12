/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

// import colors
import Colors from '../../theme/colors';

// TabBadgeIcon Config

// TabBadgeIcon Styles
const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.secondaryColor
  },
  badgeText: {
    top: -0.5,
    fontSize: 10,
    color: Colors.onSecondaryColor
  }
});

// TabBadgeIcon
const TabBadgeIcon = ({ focused, tintColor }) => (
  <View>
    <Icon name={focused ? 'cart' : 'cart-outline'} size={24} color={tintColor} />
    <View style={styles.badge}>
      <Text style={styles.badgeText}>3</Text>
    </View>
  </View>
);

export default TabBadgeIcon;
