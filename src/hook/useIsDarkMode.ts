import {useColorScheme} from 'react-native';

export const useIsDarkMode = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return {isDarkMode};
};
