import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter/Filter'
import Countries from './components/Countries/Countries'
import Weather from './components/Weather/Weather'

export default function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  return (
    <>
      find countries <Filter handleFilterChange={(e) => setSearch(e.target.value)} />
      <Countries list={countries} search={search} stateChanger={setSearch} />
      <Weather list={countries} />
    </>
  );
}
