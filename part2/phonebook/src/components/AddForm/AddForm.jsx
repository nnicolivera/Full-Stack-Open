import "../../styles.css";
import { useEffect, useRef } from 'react';

export default function AddForm(props) {
    const { submit, newName, handleName, newNumber, handleNumber, focusFlag, setFocusFlag } = props;

    const nameRef = useRef(null);

    useEffect(() => {
        nameRef.current.focus();
        setFocusFlag(false);
    }, [focusFlag]);


    return (
        <form onSubmit={submit}>
            <div>
                name: <input
                    value={newName}
                    onChange={handleName}
                    ref={nameRef} />
            </div>
            <div>
                number: <input
                    type='number'
                    value={newNumber}
                    onChange={handleNumber} />
            </div>
            <button type="submit">add</button>
        </form>
    );
}
