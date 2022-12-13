import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ category, value }) => (
  <p>{category} {value}</p>
)

const Statistics = (props) => {
  const { good, bad, neutral } = props

  const all = () => {
    return good + neutral + bad
  }

  const average = () => {
    return (good - bad) / all()
  }

  const positive = () => {
    return <>{Math.trunc((good / all()) * 100)}%</>
  }

  return (
    <>
      <StatisticLine category="good" value={good} />
      <StatisticLine category="neutral" value={neutral} />
      <StatisticLine category="bad" value={bad} />
      <StatisticLine category="all" value={all()} />
      <StatisticLine category="average" value={average()} />
      <StatisticLine category="positive" value={positive()} />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setOpinion = (x) => {
    const handler = () => {
      if (x === "n") {
        setNeutral(neutral + 1)
      } else {
        (x === "g") ? setGood(good + 1) : setBad(bad + 1)
      }
    }
    return handler
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={setOpinion("g")} text="good" />
      <Button handleClick={setOpinion("n")} text="neutral" />
      <Button handleClick={setOpinion("b")} text="bad" />
      <h1>statistics</h1>
      {good == 0 && bad == 0 && neutral == 0 ?
        <p>No feedback given</p>
        :
        <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
      }
    </>
  )
}

export default App