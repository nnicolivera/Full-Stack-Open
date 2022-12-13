import { useState } from 'react'

const Statistics = props => <div>{props.category} {props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
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

  const all = () => {
    return good + neutral + bad
  }

  const average = () => {
    return (good - bad) / all()
  }

  const positive = () => {
    return Math.trunc((good / all()) * 100)
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={setOpinion("g")} text="good" />
      <Button handleClick={setOpinion("n")} text="neutral" />
      <Button handleClick={setOpinion("b")} text="bad" />
      <h1>statistics</h1>
      <Statistics category="good" value={good} />
      <Statistics category="neutral" value={neutral} />
      <Statistics category="bad" value={bad} />
      <Statistics category="all" value={all()} />
      {good == 0 && bad == 0 && neutral == 0 ?
        <>
          <Statistics category="average" value="..." />
          <Statistics category="positive" value="..." />
        </>
        :
        <>
          <Statistics category="average" value={average()} />
          <Statistics category="positive" value={positive()} />
        </>
      }
    </>
  )
}

export default App