export const Message = ({message, user}) => {
    console.log(user)
    return (
        <div className={user?"message self":"message"}>
            <p>{message}</p>
        </div>
    );
}

