import { Component } from "react";
import { searchImages } from "shared/api/images";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { Loader } from "./components/Loader/Loader";
import { Notify } from 'notiflix';
import { Modal } from "./components/Modal/Modal";
import { LoadMoreButton } from "./components/Button/Button";

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    error: null,
    modalOpen: false,
    largeImageURL: '',
  };

    componentDidUpdate(_, prevState) {
        const { query, page } = this.state;
        if ((query && prevState.query !== query) || page > prevState.page) {
            this.fetchImages(query, page);
      }
        if (prevState.query !== query) {
        this.setState({
          images: []
        })
      }
    }

    async fetchImages() {
        const { query, page } = this.state;
        this.setState({
            isLoading: true,
        })
        try {
          const data = await searchImages(query, page);
          if (data.totalHits === 0) {
            Notify.failure('No images found!');
          } 

            this.setState(({ images }) => {
                return {
                  images: [...images, ...data.hits],
                }
            })
        } catch (error) {
            this.setState({
                error
            })
        } finally {
            this.setState({
                isLoading: false,
            })
        }
    }

  onSearch = query => {
      this.setState({
          query,
      })
  }
  
  onLoadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      }
    });
  }

  openModal = largeImageURL => {
    this.setState({
      modalOpen: true,
      largeImageURL,
    })
  }

  closeModal = () => {
    this.setState({
      modalOpen: false,
      largeImageURL: '',
    })
  }

    render() {
        const { images, isLoading, error, modalOpen, largeImageURL } = this.state;
        const isImages = Boolean(images.length);
        const { onSearch, onLoadMore, openModal, closeModal } = this;

        return (
          <>
            <Searchbar onSubmit={onSearch} />
            {isLoading && <Loader />}
            {error && Notify.failure('Please try again later!')}
            {isImages && <ImageGallery images={images} onClick={openModal} />}
            {images.length > 0 && <LoadMoreButton onLoadMore={onLoadMore} />}
            {modalOpen && <Modal onClose={closeModal}> <img src={largeImageURL} alt="" /></Modal>}
          </>
        )
    }
}

