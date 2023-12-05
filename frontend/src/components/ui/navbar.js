import React from 'react';
import styles from './navbar.module.css'
import {Link} from 'react-router-dom'
import Button from './button';

class Navbar extends React.Component{
    render(){
        return <nav>
            <div className={styles.nav_container}>
            <ul>
                <li>
                <Button text='Home' link='/'/>
                </li>
                <li>
                <Button text='Catalog' link='/catalog'/>
                </li>
                <li>
                <Button text='Fabricators' link='/fabricators'/>
                </li>
                <li>
                <Button text='Sales' link='/sales'/>
                </li>
            </ul>
            </div>

            <Button text='Login' link='/identity/login'/>
        </nav>;
    }
}
export default Navbar;