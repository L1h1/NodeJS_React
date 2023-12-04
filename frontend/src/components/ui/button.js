import React from 'react';
import {Link} from 'react-router-dom'
import style from './button.module.css'
function Button({link,text,clickfunc}) {

  return (
    <div>
      <Link className={style.btn} to={link} onClick={clickfunc}>{text}</Link>
    </div>
  );
}

export default Button;