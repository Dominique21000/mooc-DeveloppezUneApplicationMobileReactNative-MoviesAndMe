import React from 'react';
import { View, StyleSheet, Button, TextInput, FlatList, Text, ActivityIndicator} from 'react-native';
import films from '../Helpers/filmsData';
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';

class Search extends React.Component{
    constructor(props)
    {
        super(props)
        this.page=0
        this.totalPages=0
        this.searchedText=""
        this.state=
        {
            films : [],
            isLoading: false
        }
    }

    _loadFilms() {

        if (this.searchedText.length > 0)
        {
            this.setState({ isLoading : true })
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                //console.log(data)
                this.page = data.page
                this.totalPages = data.total_pages
                console.log('total_pages : ' + data.total_pages)
                this.setState({
                        films: [ ...this.state.films, ...data.results ],
                        isLoading:false,
                })
                console.log("total page " + this.totalPages);
            })

        }
    }

    _displayLoading(){
        if (this.state.isLoading){
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    _displayDetailForFilm = (idFilm) => {
        console.log('Display film id =' + idFilm)
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm})
    }

    _searchedTextInputChanged(text){
        this.searchedText = text
    }

    _searchFilms(){
        this.page = 0
        this.totalPages = 0
        this.setState({
            fims:[]
        }, () => {
            //console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " nombre de page " + this.state.films.length)
            this._loadFilms()
        })

    }

    render(){
        console.log("isLoading : " + this.state.isLoading)
        console.log("this.page" + this.page)
        console.log(this.props)
        return (
            <View style={styles.main_container}>
                <TextInput
                    onChangeText={ (text) => this._searchedTextInputChanged(text)}
                    style={styles.TextInput}
                    placeholder="Titre du film"
                    onSubmitEditing={()=> this._searchFilms() }
                    />
                <Button style={{ height:50}} title="Rechercher" onPress={() => this._searchFilms() } />
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString() }
                    renderItem={({item})=> <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm}/>}
                    onEndReachThreashold={0.5}
                    onEndReached={() => {
                        console.log(this.page + " " + this.totalPages)
                        if (this.page < this.totalPages){
                            this._loadFilms()
                        }
                        console.log("onEndReached")
                    }}
                />
                {this._displayLoading() }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container:{
        marginTop:1,
        flex:1,
    },

    TextInput:{
        marginLeft:5,
        marginRight:5,
        height:50,
        borderColor: '#000000',
        borderWidth:1,
        paddingLeft: 5,
    },

    loading_container:{
        position: 'absolute',
        left:0,
        right:0,
        top:100,
        bottom:0,
        justifyContent:'center',
    }
})

export default Search;
