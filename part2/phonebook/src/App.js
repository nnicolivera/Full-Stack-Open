import { useState, useEffect } from 'react'
import AddForm from './components/AddForm/AddForm'
import Filter from './components/Filter/Filter'
import Persons from './components/Persons/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initalPersons => {
        setPersons(initalPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    const list = JSON.stringify(persons.map(x => x.name));
    const name = JSON.stringify(nameObject.name)

    if (name.length === 2) {
      alert(`Debe completar un nombre`)
    } else if (list.includes(name)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      // setPersons(persons.concat(nameObject))
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>filter shown with <Filter handleFilterChange={(e) => setSearch(e.target.value)} /></div>
      <h2>Add a new</h2>
      <AddForm
        submit={addName}
        newName={newName}
        handleName={handleNameChange}
        newNumber={newNumber}
        handleNumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons list={persons} search={search} />
    </div>
  )
}

export default App