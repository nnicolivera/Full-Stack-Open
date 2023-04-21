import { useState, useEffect } from 'react';
import AddForm from './components/AddForm/AddForm';
import Filter from './components/Filter/Filter';
import { Notification } from './components/Notification/Notification';
import Persons from './components/Persons/Persons';
import personService from './services/persons';

export const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [focusFlag, setFocusFlag] = useState(false);
  const [notification, setNotification] = useState({
    message: null,
    type: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await personService.getAll();
        setPersons(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const emptyInputs = () => {
    setNewName("");
    setNewNumber("");
  }

  const handleNotification = (message, type) => {
    setNotification({
      message: message,
      type: type
    });
    setTimeout(() => {
      setNotification({
        message: null,
        type: null,
      });
    }, 3000);
  }

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    const existingPerson = persons.find(person => person.name.toLowerCase().trim() === newName.toLowerCase().trim());

    if (!newName || !newNumber) {
      alert("Empty fields!");
      return;
    }

    if (!isNaN(+newName)) {
      alert("Name only contains letters!");
      return;
    }

    if (existingPerson && existingPerson.number === newNumber) {
      alert(`${newName} is already added to phonebook`);
      return
    }

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const changedNumber = { ...existingPerson, number: newNumber };
        const updateNumber = async () => {
          await personService.update(existingPerson.id, changedNumber);
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : changedNumber));
          handleNotification(`Changed ${newName}'s phone number`, 'success');
        }

        const handleError = async () => {
          try {
            await updateNumber();
          } catch (error) {
            handleNotification(`Information of ${existingPerson.name} has already been removed from server`, 'error');
          }
        }
        handleError();
      }
    } else {
      personService.create(nameObject);
      setPersons(persons.concat(nameObject));
      handleNotification(`Added ${newName}`, 'success');
    }
    emptyInputs();
    setFocusFlag(true);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <div>filter shown with <Filter handleFilterChange={(e) => setSearch(e.target.value)} /></div>
      <h2>Add a new</h2>
      <AddForm
        submit={addName}
        newName={newName}
        handleName={handleNameChange}
        newNumber={newNumber}
        handleNumber={handleNumberChange}
        focusFlag={focusFlag}
        setFocusFlag={setFocusFlag}
      />
      {
        persons.length > 0 && <>
          <h2>Numbers</h2>
          <Persons persons={persons} search={search} setPersons={setPersons} setFocusFlag={setFocusFlag} />
        </>
      }
    </div>
  )
} 