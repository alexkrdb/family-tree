import { unmountComponentAtNode } from 'react-dom';
import { auth } from '../../config/firebase'
import Login from './Login';
import { act, findRenderedComponentWithType } from 'react-dom/test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';


const testEmail = "test@email.com"
const testPwd = "123456"
let container = null;
let button
let inputFields
// let 
beforeEach(async () => {
    await auth.signOut()
    container = document.createElement("div");
    document.body.appendChild(container);
    
})

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test("login user with right credentials", async() => {
    const user = await signInWithEmailAndPassword(auth, testEmail, testPwd)
    expect(user.user).toBeTruthy()
    expect(user.user.email).toBe(testEmail)  
})

test("login user with wrong credentials", async() => {
    await expect(signInWithEmailAndPassword(auth, testEmail+"1", testPwd))
        .rejects
        .toThrow(FirebaseError)
})