import { useState } from 'react'
import {auth} from '../../config/firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import { db } from '../../config/firebase';
import { serverTimestamp, setDoc, doc } from 'firebase/firestore';


export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate();

    async function createUser(user) {
        await setDoc(doc(db, "users", user.uid), {
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            createdAt: serverTimestamp(), 
            chats: []
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            createUser(user);
            navigate("/")

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);

        });

        

    }


    return (
        <div className='register'>
            <div className='content'>
                <form onSubmit={onSubmit}>
                    <input type='text' placeholder='Email' required
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    <input type='password' placeholder='Password' required
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    <button type="submit" >Submit</button>
                </form>
            </div>
        </div>
    );

}