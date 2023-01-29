const All = ({ list }) => {
    return (
        <ul>
            {list.map(x => <li key={x.flag}>{x.name.common}</li>)}
        </ul>
    )
}

const FilteredCountries = ({ list, search, changer }) => {
    const filter = document.getElementById("filter")

    return (
        <ul>
            {list.filter((item) => {
                const name = item.name.common
                if (search.toLocaleLowerCase() === '') {
                    return item
                } else {
                    return name.toLocaleLowerCase().includes(search)
                }
            })
                .map(item => {
                    const name = item.name.common
                    return (
                        <li key={item.flag}>
                            {name} <input type={'button'} value={'show'} onClick={() => {
                                changer(name.toLocaleLowerCase())
                                filter.value = name.toLocaleLowerCase()
                            }} />
                        </li>
                    )
                })}
        </ul>
    )
}

const SingleCountry = ({ list, search }) => {
    let element = []
    element = list.filter(item => item.name.common.toLocaleLowerCase().includes(search))
    let i = element[0]
    let lang = element[0].languages;
    return (
        <>
            <h1>{i.name.common}</h1>
            <div>capital {i.capital[0]}</div>
            <div>area {i.area}</div>
            <p> <strong>languages:</strong> </p>
            <ul>
                {Object.keys(lang).map((key, index) => (
                    <li key={index}>{lang[key]}</li>
                ))}
            </ul>
            <img src={i.flags.png} alt="Country flag" width={150} />
        </>
    )
}

export default function Countries({ list, search, stateChanger }) {
    let filteredList = []
    filteredList = list.filter(item => item.name.common.toLocaleLowerCase().includes(search))

    if (search.toLocaleLowerCase() === "") {
        return (
            <All list={list} />
        )
    } else if (filteredList.length > 10) {
        return (
            <p>
                Too many matches, specify another filter
            </p>
        )
    } else if (filteredList.length === 1) {
        return (
            <SingleCountry list={list} search={search} />
        )
    } else {
        return (
            <FilteredCountries list={list} search={search} changer={stateChanger} />
        )
    }
}
