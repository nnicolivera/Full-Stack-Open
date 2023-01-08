import { useState } from 'react'
import AddForm from './components/AddForm/AddForm'
import Filter from './components/Filter/Filter'
import Persons from './components/Persons/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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
      setPersons(persons.concat(nameObject))
    }

    setNewName('')
    setNewNumber('')
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