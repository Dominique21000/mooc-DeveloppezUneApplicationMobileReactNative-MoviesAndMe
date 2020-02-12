import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// composant
import Search from './Components/Search';


const AppNavigator = createStackNavigator({
    /* on nomme la route pour nous */
    Search: { screen : Search },
});

const App = createAppContainer(AppNavigator);

export default App;
