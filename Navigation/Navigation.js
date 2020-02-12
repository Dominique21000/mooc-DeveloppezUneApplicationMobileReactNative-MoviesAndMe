import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail'

const AppNavigator = createStackNavigator({
    /* on nomme la route pour nous */
    Search: {
        screen : Search },

    FilmDetail : {
        screen : FilmDetail
    }

});

const Navigation = createAppContainer(AppNavigator);

export default Navigation;
