import { useState, useEffect } from 'react';

import { Wrapper, HeroTitle, Title } from './App.styled';
import { ContactsForm } from 'components/ContactsForm/ContactsForm';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { GlobalStyle } from 'components/GlobalStyle';
import { Filter } from 'components/Filter/Filter';

const getContactsFromLocalStorage = () => {
  const contactsInLocalStorage = JSON.parse(localStorage.getItem('contacts'));
  return contactsInLocalStorage ? contactsInLocalStorage : [];
};

export function App() {
  const [contacts, setContacts] = useState(getContactsFromLocalStorage);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    if (contacts.find(contact => contact.name === newContact.name)) {
      return alert(`${newContact.name} is already in contacts.`);
    }

    setContacts(contacts => [...contacts, newContact]);
  };

  const filterContacts = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <Wrapper>
      <HeroTitle>Phonebook</HeroTitle>
      <ContactsForm onSave={addContact} />

      <Title>Contacts</Title>
      <Filter onSearch={filter} onChange={filterContacts} />
      <ContactsList
        contactsList={getFilteredContacts()}
        onDelete={deleteContact}
      />

      <GlobalStyle />
    </Wrapper>
  );
}

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   addContact = newContact => {
//     if (this.state.contacts.find(contact => contact.name === newContact.name)) {
//       return alert(`${newContact.name} is already in contacts.`);
//     }

//     this.setState(({ contacts }) => ({
//       contacts: [...contacts, newContact],
//     }));
//   };

//   filterContacts = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

// deleteContact = contactId => {
//   this.setState(prevState => ({
//     contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//   }));
// };

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     if (contacts) {
//       const parsedContacts = JSON.parse(contacts);
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   render() {
//     const { contacts, filter } = this.state;

// const filteredContacts = contacts.filter(contact =>
//   contact.name.toLowerCase().includes(filter.toLowerCase())
// );

// return (
//   <Wrapper>
//     <HeroTitle>Phonebook</HeroTitle>
//     <ContactsForm onSave={this.addContact} />

//     <Title>Contacts</Title>
//     <Filter onSearch={filter} onChange={this.filterContacts} />
//     <ContactsList
//       contactsList={filteredContacts}
//       onDelete={this.deleteContact}
//     />

//     <GlobalStyle />
//   </Wrapper>
// );
//   }
// }
