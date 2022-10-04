import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Auth.module.scss';
import loginImg from '../../assets/login.png';
import {FaGoogle} from 'react-icons/fa';
import Card from '../../components/card/Card';

const Login = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
          <img src={loginImg} alt='Login' width="400" />
      </div>
      <Card>
        <div className={styles.form}>
            <h2>Login</h2>
            <form>
                <input type="text" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit" className='--btn --btn-primary --btn-block'>Login</button>

                <div className={styles.links}>
                    <Link to="/reset">Reset Password</Link>
                </div>
                <p>-- or --</p>
                <button type="submit" className='--btn --btn-danger --btn-block'><FaGoogle color="#fff" size={20} /> &nbsp;  Login With Google</button>
                <space className={styles.register}>
                  <p>Didn't have any account?</p>
                  <Link to="/register">Register</Link>
                </space>

            </form>
        </div>
      </Card>

    </section>
  )
}

export default Login