import { useState, useEffect, useRef } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { SearchBox } from '../SearchBox/SearchBox';
import css from './App.module.css';

export default function App() {
    const [contacts, setContacts] = useState(() => {
        const savedContacts = localStorage.getItem('contacts');
        return savedContacts ? JSON.parse(savedContacts) : [];
    });
    const [filter, setFilter] = useState('');
    const nameInputRef = useRef(null);
    const searchInputRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    useEffect(() => {
        searchInputRef.current?.focus();
    }, []);

    const addContact = async (newContact) => {
        const isExist = contacts.find(
            contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
        );

        if (isExist) {
            alert(`${newContact.name} is already in contacts.`);
            return;
        }

        await setContacts(prevContacts => [...prevContacts, newContact]);
        setTimeout(() => {
            searchInputRef.current?.focus();
        }, 0);
    };

    const deleteContact = async (contactId) => {
        const contactToDelete = contacts.find(contact => contact.id === contactId);

        const isConfirmed = window.confirm(`${contactToDelete.name} kişisini silmek istediğinizden emin misiniz?`);

        if (isConfirmed) {
            await setContacts(prevContacts =>
                prevContacts.filter(contact => contact.id !== contactId)
            );
        }

        setTimeout(() => {
            searchInputRef.current?.focus();
        }, 0);
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className={css.container}>
            <h1>Phonebook</h1>
            <ContactForm onSubmit={addContact} nameInputRef={nameInputRef} />
            <SearchBox
                value={filter}
                onChange={setFilter}
                searchInputRef={searchInputRef}
            />
            <ContactList contacts={filteredContacts} onDelete={deleteContact} />
        </div>
    );
} 