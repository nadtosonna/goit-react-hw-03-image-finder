import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, onClick }) => {
    return (
        <ul className={css.gallery}>
            {images.map(({ id, webformatURL, largeImageURL }) => {
                return (
                    <ImageGalleryItem
                        key={id}
                        webformatURL={webformatURL}
                        largeImageURL={largeImageURL}
                        onClick={onClick} />
                )
            })}
        </ul>
    )
}

ImageGallery.propTypes = {
    images: PropTypes.array,
    onClick: PropTypes.func,
    id: PropTypes.number,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string
}