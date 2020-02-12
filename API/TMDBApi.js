const API_TOKEN = "e1e4c14b732f5b0d80acf5ab49a03513";

export function getFilmsFromApiWithSearchedText(text, page){
    const url = 'https://api.themoviedb.org/3/search/movie/?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page
    console.log(url)
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}

export function getImageFromApi(name){
    return 'https://image.tmdb.org/t/p/w300/' + name
}
