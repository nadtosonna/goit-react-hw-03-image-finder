import { Component } from "react";
import { HiSearch } from 'react-icons/hi';
import { Notify } from 'notiflix';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
    state = {
        query: '',
    }

    onChange = e => {
        const { value, name } = e.currentTarget;
        this.setState({
            [name]: value
        })
    }
    
    onSubmit = e => {
        e.preventDefault();

        if (this.state.query.trim() === '') {
            Notify.failure('Enter your search request, please!');
            return;
        }
        this.props.onSubmit(this.state.query);
        this.setState({
            query: ''
        })
    }

    render() {
        return (
        <header className={css.searchbar}>
            <form className={css.form} onSubmit={this.onSubmit}>
                <input
                    className={css.input}
                    name="query"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={this.onChange}
                    value={this.state.query}
                    />
                    
                <button type="submit" className={css.searchBtn}>
                    <span className={css.searchLabel}> <HiSearch size={40} /> </span>
                </button>
            </form>
            </header>
        )
    }
}

