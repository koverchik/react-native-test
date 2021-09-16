import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { useThemeAwareObject } from '@theme/ThemeAwareObject.hook';
import { createStyles } from './style';

export const IconMarker: FC = () => {
  const Styles = useThemeAwareObject(createStyles);

  return (
    <Svg height={40} viewBox="0 0 512 512" width={40} style={Styles.container}>
      <Path
        d="M256.08 56c84.87 0 153.81 68.94 153.81 153.96 0 77.06-87.02 195.03-153.2 246.04-85.33-69.24-154.58-167.75-154.58-246.04C102.11 124.94 171.05 56 256.08 56zm74.79 150.8c0-41.34-33.521-74.86-74.87-74.86-41.35 0-74.86 33.52-74.86 74.86 0 41.35 33.51 74.87 74.86 74.87s74.87-33.52 74.87-74.87z"
        fill="#ff7979"
      />
      <Path d="M256 291.67c-46.792 0-84.86-38.073-84.86-84.87 0-46.792 38.068-84.86 84.86-84.86 46.798 0 84.87 38.068 84.87 84.86 0 46.797-38.072 84.87-84.87 84.87zm0-149.73c-35.764 0-64.86 29.096-64.86 64.86 0 35.77 29.096 64.87 64.86 64.87 35.77 0 64.87-29.101 64.87-64.87 0-35.764-29.1-64.86-64.87-64.86z" />
      <Path d="M256.69 466a9.983 9.983 0 01-6.301-2.234c-43.852-35.583-83.405-78.891-111.374-121.944C108.33 294.586 92.11 248.989 92.11 209.96 92.11 119.552 165.667 46 256.08 46c90.325 0 163.81 73.552 163.81 163.96 0 36.966-18.978 86.08-53.436 138.297-30.08 45.58-68.831 88.818-103.659 115.663a9.978 9.978 0 01-6.105 2.08zm-.61-400c-79.385 0-143.97 64.58-143.97 143.96 0 67.695 57.873 160.65 144.696 233.182C324.356 387.99 399.89 277.181 399.89 209.96 399.89 130.58 335.377 66 256.08 66z" />
    </Svg>
  );
};
