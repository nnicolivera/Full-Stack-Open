const Header = ({ name }) => <h2>{name}</h2>

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Total = ({ props }) => {
    const sum = (props.reduce((acc, obj) => acc + obj.exercises, 0));
    return (
        <b>total of {sum} exercises</b>
    )
}

const Content = ({ props }) => {
    return (props.map(x => {
        return (
            <div key={x.id}>
                <Header name={x.name} />
                {x.parts.map(y => <Part key={y.id} name={y.name} exercises={y.exercises} />)}
                <Total props={x.parts} />
            </div>
        )
    })
    )
}

const Course = ({ courses }) => {
    return (
        <>
            <h1>Web development curriculum</h1>
            <Content props={courses}></Content>
        </>
    )
}

export default Course;