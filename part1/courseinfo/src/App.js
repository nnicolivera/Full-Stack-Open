const Header = ({ name }) => <h1>{name}</h1>

const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part}></Part>)

const Part = ({ part: { name, exercises } }) => <p>{name} {exercises}</p>

const Total = ({ parts }) => {
  let sum = parts.reduce((acc, obj) => { return acc + obj.exercises; }, 0);

  return (
    <b>total of {sum} exercises</b>
  )
}

const Course = ({ course: { name, parts } }) => {

  return (
    <>
      <Header name={name}></Header>
      <Content parts={parts}></Content>
      <Total parts={parts}></Total>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
      {
        name: 'Styling with CSS',
        exercises: 6,
        id: 5
      }
    ]
  }

  return <Course course={course} />
}

export default App