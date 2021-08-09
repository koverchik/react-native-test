import React, { FC, useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { createStyles } from './style';
import { SettingsScreenProps } from './type';
import { useThemeAwareObject } from '../../Theme/ThemeAwareObject.hook';

export const SettingsScreen = React.memo<SettingsScreenProps>(() => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [nameTheme, setNameTheme] = useState('Dark');
    const toggleSwitch = () => {
        setIsEnabled((previousState) => !previousState);
        nameTheme === 'Dark' ? setNameTheme('Light') : setNameTheme('Dark');
    };
    const Styles = useThemeAwareObject(createStyles);
    return (
        <View style={Styles.container}>
            <Text>Settings</Text>
            <View style={Styles.settings}>
                <Text>Theme</Text>
                <Text style={Styles.item}>{nameTheme}</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </View>
    );
});
