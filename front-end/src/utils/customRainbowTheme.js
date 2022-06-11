import { darkTheme } from '@rainbow-me/rainbowkit';
import merge from 'lodash.merge';

const alfredTheme =merge(darkTheme(), {
    colors: {
      accentColorForeground: '#586e75',
      accentColor: '#fdf6e3',
      connectButtonBackground: '#fdf6e3',
      connectButtonBackgroundError: '#dc322f',
      connectButtonInnerBackground: '#eee8d5',
      connectButtonText: '#586e75',
      connectButtonTextError: '#586e75',
    }
  });

export default alfredTheme;