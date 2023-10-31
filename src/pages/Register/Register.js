import { useState } from 'react';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { serverTimestamp, setDoc, doc } from 'firebase/firestore';

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fName: "",
    lName: "",
    dBirth: null, 
    country: "",
    location: "",
    bio: ""
  });

  const navigate = useNavigate();

  async function createUser(user) {
    const { email, password, fName, lName, dBirth, country, location, bio } = formData;

    const userDoc = {
      displayName: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
      createdAt: serverTimestamp(),
      chats: []
    };

    if (fName || lName || dBirth || country || location || bio) {
      userDoc.bio = {
        fName,
        lName,
        dBirth: dBirth ? new Date(dBirth) : null, 
        country,
        location,
        bio
      };
    }

    await setDoc(doc(db, "users", user.uid), userDoc);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        createUser(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className='register'>
      <div className='content'>
        <form onSubmit={onSubmit}>
          <input type='text' name="email" placeholder='Email' required onChange={handleInput} />
          <input type='password' name="password" placeholder='Password' required onChange={handleInput} />
          <input type='text' name="fName" placeholder='FName' onChange={handleInput} />
          <input type='text' name="lName" placeholder='LName' onChange={handleInput} />
          <input type='date' name="dBirth" placeholder='dBirth' onChange={handleInput} />
          <input type='text' name="country" placeholder='Country' onChange={handleInput} />
          <input type='text' name="location" placeholder='Location' onChange={handleInput} />
          <input type='text' name="bio" placeholder='Bio' onChange={handleInput} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
