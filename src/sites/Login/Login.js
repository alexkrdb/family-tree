import { useState } from 'react'
import {auth} from '../../config/firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {Link, useNavigate} from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate();

    const onSubmit = async (e) => {

        e.preventDefault()
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("User authenticated with: ", user.uid);
            navigate("/")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });

    }


    return (
        <div className='login content'>
            <form onSubmit={onSubmit}>
                <input type='text'  placeholder='Email' required
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
                <input type='password' placeholder='Password' required
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
                <button type="submit" >Submit</button>
                <Link to="/register">Don't have an account? Register</Link>
            </form>
            
        </div>
    );

}