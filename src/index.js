import './sass/main.scss';
import NewsApiService from './js/apiService'
import refs from './js/refs';
import Notiflix from 'notiflix';
import cards from './templates/gallery-cards.hbs';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/src/simple-lightbox.scss';

const gallery = new SimpleLightbox('.photo-card a');

const newsApiService = new NewsApiService();


refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoad)

refs.loadMoreBtn.classList.add('is-hidden');


async function onSearch(e){
    e.preventDefault();
    newsApiService.resetPage();
    newsApiService.query = e.currentTarget.elements.searchQuery.value;
    
    try {
        const result = await newsApiService.fetchArticles();
        
        if (newsApiService.query.trim() === '' || result.hits.length === 0){    
            clearCardsContainer();
            refs.loadMoreBtn.classList.add('is-hidden');
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {  
            refs.loadMoreBtn.classList.remove('is-hidden');

            clearCardsContainer();
            Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
            appendCardsMarkup(result.hits);

            gallery.refresh(); 
}
   } catch (error) {
       console.log(error);
   }
}

async function onLoad (){
    try { 
        refs.loadMoreBtn.disabled = true;
        const result = await newsApiService.fetchArticles();
        appendCardsMarkup(result.hits);
        gallery.refresh();
        refs.loadMoreBtn.disabled = false;

        const lengthHits = refs.galleryCards.querySelectorAll('.photo-card').length;
      
        
        if (lengthHits >= result.totalHits){
            Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
            refs.loadMoreBtn.classList.add('is-hidden');
        } 

    }
        catch (error){
            console.log(error)
        }
       
    } 

function appendCardsMarkup(data){
 refs.galleryCards.insertAdjacentHTML('beforeend', cards(data));
};

function clearCardsContainer () {
    refs.galleryCards.innerHTML = '';
}
