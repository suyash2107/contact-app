import React, { useState, useEffect } from 'react';
import "./Home.css";

function Home() {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [editIndex, setEditIndex] = useState(-1); // Initialize as -1 to indicate no editing

    // Load contacts from local storage on component mount
    useEffect(() => {
        const storedContacts = localStorage.getItem('contacts');
        if (storedContacts) {
            setContacts(JSON.parse(storedContacts));
        }
    }, []);

    // Save contacts to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const addContact = () => {
        if (!name || !email || !mobile) {
            alert('Name, Email, and Mobile are required');
            return;
        }

        // Create a new contact object
        const newContact = {
            name,
            email,
            mobile
        };

        // If editing, update the contact at the editIndex
        if (editIndex !== -1) {
            const updatedContacts = [...contacts];
            updatedContacts[editIndex] = newContact;
            setContacts(updatedContacts);
            setEditIndex(-1); // Clear the editIndex
        } else {
            // Add the new contact to the contacts array
            setContacts([...contacts, newContact]);
        }

        // Clear input fields
        setName('');
        setEmail('');
        setMobile('');
    }

    const editContact = (index) => {
        const contactToEdit = contacts[index];
        setName(contactToEdit.name);
        setEmail(contactToEdit.email);
        setMobile(contactToEdit.mobile);
        setEditIndex(index);
    }

    const deleteContact = (index) => {
        const updatedContacts = [...contacts];
        updatedContacts.splice(index, 1);
        setContacts(updatedContacts);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'mobile') {
            setMobile(value);
        }
    };

    return (
        <div>
            <h1 className='app-title'>Contact App</h1>
            <div className='app-body'>
                <div className='contact-container'>
                    <h2 className='sub-heading'>Show Contact</h2>
                    {contacts.map((contact, index) => (
                        <div className='contact-card' key={index}>
                            <p className='contact-name'>{contact.name}</p>
                            <p className='contact-mobile'>{contact.mobile}</p>
                            <p className='contact-email'>{contact.email}</p>
                            <button
                                className='btn-edit-contact'
                                onClick={() => editContact(index)}
                            >
                                Edit
                            </button>
                            <button
                                className='btn-delete-contact'
                                onClick={() => deleteContact(index)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
                <div className='add-contact-container'>
                    <h2 className='sub-heading'>{editIndex !== -1 ? 'Edit Contact' : 'Add Contact'}</h2>
                    <form>
                        <input
                            type='text'
                            placeholder='Name'
                            className='user-input'
                            name='name'
                            value={name}
                            onChange={handleInputChange}
                        />
                        <input
                            type='text'
                            placeholder='Email'
                            className='user-input'
                            name='email'
                            value={email}
                            onChange={handleInputChange}
                        />
                        <input
                            type='text'
                            placeholder='Mobile'
                            className='user-input'
                            name='mobile'
                            value={mobile}
                            onChange={handleInputChange}
                        />
                        <button type='button' onClick={addContact} className='btn-add-contact'>
                            {editIndex !== -1 ? 'Save' : 'Add'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Home;
