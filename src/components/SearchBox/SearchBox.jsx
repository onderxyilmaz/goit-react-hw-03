import css from './SearchBox.module.css';

export const SearchBox = ({ value, onChange, searchInputRef }) => {
    return (
        <div className={css.wrapper}>
            <label htmlFor="search">Find contacts by name</label>
            <input
                type="text"
                id="search"
                value={value}
                onChange={e => onChange(e.target.value)}
                className={css.input}
                ref={searchInputRef}
            />
        </div>
    );
}; 