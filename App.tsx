/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StackNavigator } from './src/presentation/Navigation/StackNavigator';
import { PaperProvider } from 'react-native-paper';
import { ThemeContextProvider } from './src/presentation/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={ queryClient }>
      <ThemeContextProvider>
        <StackNavigator />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}


export default App;
