import personService from '../../services/persons';

export default function Persons({ persons, search, setPersons, setFocusFlag }) {
    const handleDelete = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            personService.remove(id, persons);
            setPersons(persons.filter(person => person.id !== id));
            setFocusFlag(true);
        }
    }

    return (
        <ul>
            {persons.filter((item) => {
                return search.toLocaleLowerCase() === ''
                    ? item
                    : item.name.toLocaleLowerCase().includes(search);
            }).map(item => (
                <li key={item.id} id={item.id}>{item.name} {item.number} <button onClick={() => handleDelete(item.id, item.name)}>Delete</button></li>
            ))}
        </ul>
    )
}
