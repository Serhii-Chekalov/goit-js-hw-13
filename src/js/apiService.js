import axios from "axios";

export default class NewsApiService {
    constructor (){
        this.searchQuery = '';
        this.page = 1;
        this.totalHits = '';

    }

    async fetchArticles() {
        const url =`https://pixabay.com/api/?key=22578117-98ddcf36fbc3d0da8c48aeee6&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
        const response = await axios.get(url);
            this.page +=1;
            return response.data;

        }
        
    resetPage () {
        this.page = 1;
    };
    
    get query() {
        return this.searchQuery;
    }
    
    set query(newQuery) {
     this.searchQuery = newQuery;
 }

}