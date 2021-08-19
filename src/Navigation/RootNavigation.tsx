import React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { SettingsNavigation } from './SettingsNavigation';
import { HomeNavigation } from './HomeNavigation';
import { TabNavigationScreen } from './types';
import { TabNavigatorParamList } from './RootStackPrams';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useThemeAwareObject } from '../Theme/ThemeAwareObject.hook';
import { createStyles } from './style';
import { useTheme } from '../Theme/Theme.context';
import { TabBarIcon } from './tabBarIcon';
import { useTranslation } from 'react-i18next';
import { useFlipper, useReduxDevToolsExtension } from '@react-navigation/devtools';

const Tab = createMaterialBottomTabNavigator<TabNavigatorParamList>();

export const RootNavigation = () => {
  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);
  useReduxDevToolsExtension(navigationRef);

  const { theme } = useTheme();
  const Styles = useThemeAwareObject(createStyles);
  const { t } = useTranslation();

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        initialRouteName={TabNavigationScreen.HomeTab}
        activeColor={theme.color.onPrimary}
        inactiveColor={theme.color.primary}
        barStyle={{ backgroundColor: Styles.container.backgroundColor }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            return <TabBarIcon route={route} focused={focused} />;
          },
        })}
      >
        <Tab.Screen
          options={{
            tabBarLabel: t('title:HomeScreen'),
          }}
          name={TabNavigationScreen.HomeTab}
          component={HomeNavigation}
        />
        <Tab.Screen
          name={TabNavigationScreen.SettingsTab}
          component={SettingsNavigation}
          options={{
            tabBarLabel: t('title:SettingsScreen'),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
