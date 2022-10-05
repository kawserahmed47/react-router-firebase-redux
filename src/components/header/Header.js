import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from "../../redux/slice/authSlice";
import {ShowOnLogin, ShowOnLogOut} from "../hiddenLink/HiddenLink";



const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart
      <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
);


const activeLink = ({isActive}) => (  isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [authUser, setAuthUser] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const dispatch = useDispatch(); 

    // Monitor currently sign in user
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          if(user.displayName == null){
            setDisplayName(user.email.substring(0, user.email.indexOf('@')));
          } else {
            setDisplayName(user.displayName);
          }
          console.log(user.displayName);

         
          setAuthUser(true);

          dispatch(
            SET_ACTIVE_USER({
              isLoggedIn: true,
              email: user.email,
              userName: displayName,
              userID: user.uid
            })
          )

        } else {
          setDisplayName("");
          setAuthUser(false);

          dispatch(
            REMOVE_ACTIVE_USER({
              isLoggedIn: false,
              email: null,
              userName: null,
              userID: null
            })
          )
        }
      });
    }, [dispatch, displayName]);

  const toggleMenu = () => { 
    setShowMenu(!showMenu);
  }

  const hideMenu = () => { 
    setShowMenu(false);
  }

  const navigate = useNavigate();

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully.");

        setTimeout(() => {
          navigate('/')
        }, 3000);

      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
   
    <header>
      <div className={styles.header}>
        {logo}
        <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
          <div className={
             showMenu
             ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
             : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          >
            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={20} color="#fff" onClick={hideMenu} />
              </li>
              <li>
                <NavLink to="/" className={activeLink} end>Home</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={activeLink}>Contact Us</NavLink>
              </li>
            </ul>
          </div>
          
          <div className={styles["header-right"]} onClick={hideMenu}>
            {cart}
            <span className={styles.links}>
              <NavLink to="/order-history" className={activeLink}>My Orders</NavLink>
              {/* {
                authUser ?
                <span>
                  <a href="#"><FaUserCircle size={16} /> &nbsp; Hi, {displayName}</a>
                  <NavLink to="/" onClick={logoutUser}> Logout</NavLink>
                </span>   
                : 
                <span>
                  <NavLink to="/login" className={activeLink} >Login</NavLink>
                  <NavLink to="/register" className={activeLink}>Register</NavLink>
                </span>
              } */}

              <ShowOnLogin>
                <a href="#"><FaUserCircle size={16} /> &nbsp; Hi, {displayName}</a>
                <NavLink to="/" onClick={logoutUser}> Logout</NavLink>
              </ShowOnLogin>

              <ShowOnLogOut>
                  <NavLink to="/login" className={activeLink} >Login</NavLink>
                  <NavLink to="/register" className={activeLink}>Register</NavLink>
              </ShowOnLogOut>

            </span>
          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={20} onClick={toggleMenu} />
        </div>
      </div>
    </header>


  );
};

export default Header;
