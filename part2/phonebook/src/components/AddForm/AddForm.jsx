export default function AddForm(props) {
    const { submit, newName, handleName, newNumber, handleNumber } = props
    return (
        <form onSubmit={submit}>
            <div>
                name: <input
                    value={newName}
                    onChange={handleName} />
            </div>
            <div>
                number: <input
                    value={newNumber}
                    onChange={handleNumber} />
            </div>
            <button type="submit">add</button>
        </form>
    )
}
