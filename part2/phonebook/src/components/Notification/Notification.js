export const Notification = ({ notification }) => {
    const { message, type } = { ...notification };
    if (message === null) {
        return null;
    }

    return (
        <div className={type === 'success' ? 'success' : 'error'}>
            {message}
        </div>
    )
}