export default function Persons({ list, search }) {
    return (
        <ul>
            {list.filter((item) => {
                return search.toLocaleLowerCase() === ''
                    ? item
                    : item.name.toLocaleLowerCase().includes(search)
            }).map(item => (
                <li key={item.name}>{item.name} {item.number}</li>
            ))}
        </ul>
    )
}
