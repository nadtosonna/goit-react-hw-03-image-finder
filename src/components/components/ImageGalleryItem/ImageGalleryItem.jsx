import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
        return (
        <li className={css.galleryItem}>
                <img
                    className={css.galleryImg}
                    src={webformatURL}
                    alt=''
                    loading='lazy'
                    onClick={() => {
                        onClick(largeImageURL);
                    }} />
        </li>
        )}

ImageGalleryItem.propTypes = {
    onClick: PropTypes.func,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string
}