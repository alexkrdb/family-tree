export const Message = ({message, user}) => {
    return (
        <div className={user?"message self":"message"}>
            <p>{message}</p>
        </div>
    );
}

