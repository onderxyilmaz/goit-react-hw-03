import css from './Contact.module.css';

export const Contact = ({ contact: { id, name, number }, onDelete }) => {
    return (
        <div className={css.wrapper}>
            <div className={css.info}>
                <span className={css.name}>{name}</span>
                <span className={css.number}>{number}</span>
            </div>
            <button
                type="button"
                onClick={() => onDelete(id)}
                className={css.button}
            >
                Delete
            </button>
        </div>
    );
}; 