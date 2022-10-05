import React, {useState} from 'react'
import styles from './Auth.module.scss';
import loginImg from '../../assets/login.png';
import {FaGoogle} from 'react-icons/fa';
import Card from '../../components/card/Card';
import { Link, useNavigate } from "react-router-dom";
import Loader from '../../components/loader/Loader'
import { toast } from 'react-toastify';
import {auth} from "../../firebase/config.js";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);
        toast.success("Login Successful...");
        setTimeout(() => {
          navigate('/')
        }, 3000);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  const provider = new GoogleAuthProvider();
const signInWithGoogle = () => { 
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    toast.success("Login Successful...");
    setTimeout(() => {
      navigate('/')
    }, 3000);
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
  });
 }

  return (
    <>
      {isLoading && <Loader/>}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
            <img src={loginImg} alt='Login' width="400" />
        </div>
        <Card>
          <div className={styles.form}>
              <h2>Login</h2>
              <form onSubmit={loginUser}>
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <button type="submit" className='--btn --btn-primary --btn-block'>Login</button>

                  <div className={styles.links}>
                      <Link to="/reset">Reset Password</Link>
                  </div>
                  <p>-- or --</p>
                  <button onClick={signInWithGoogle} type="button" className='--btn --btn-danger --btn-block'><FaGoogle color="#fff" size={20} /> &nbsp;  Login With Google</button>
                  <span className={styles.register}>
                    <p>Didn't have any account?</p>
                    <Link to="/register">Register</Link>
                  </span>

              </form>
          </div>
        </Card>
      </section>
    </>
    
  )
}

export default Login