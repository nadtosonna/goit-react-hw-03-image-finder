import { Component } from "react";
import { searchImages } from "shared/api/images";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { Searchbar } from "./components/Searchbar/Searchbar";

export class App extends Component {
  state = {
    q: '',
    page: 1,
    images: [],
    isLoading: false,
    total: 0,
    error: null,
    modalOpen: false,
    largeImageUrl: '',
  };

    componentDidUpdate(_, prevState) {
        const { q, page } = this.state;
        if ((q && prevState.q !== q) || page > prevState.page) {
            this.fetchImages(q, page);
        }
    }

    async fetchImages() {
        const { q, page } = this.state;
        this.setState({
            isLoading: true,
        })
        try {
            const data = await searchImages(q, page);
            this.setState(({ images }) => {
                return {
                  images: [...images, ...data.hits],
                  total: data.totalHits,
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

  onSearch = q => {
      this.setState({
          q,
      })
  }
  
  onloadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      }
    });
  }

  openModal = (largeImageUrl) => {
    this.setState({
      modalOpen: true
    })
  }

  closeModal = () => {
    this.setState({
      modalOpen: false
    })
  }

    render() {
        const { images, isLoading, error, modalOpen } = this.state;
        const isImages = Boolean(images.length);
        const { onSearch, onloadMore, openModal, closeModal } = this;

        return (
          <>
            <Searchbar onSubmit={onSearch} />
            {isImages && <ImageGallery images={images} onClick={openModal} />}
          </>
        )
    }
}