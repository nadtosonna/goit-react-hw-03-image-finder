import css from './Button.module.css';

export function LoadMoreButton({ onLoadMore }) {
    return (
        <button className={css.button} onClick={onLoadMore}>Load more</button>
    )
}