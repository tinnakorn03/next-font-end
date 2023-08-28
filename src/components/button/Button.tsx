"use client";
import React, { useState, useEffect, useMemo} from 'react'; 
import styles from './style.module.css'; 

type IPropsCButton = {
  name: String;
  onClick?: ()=> void;
  style?: React.CSSProperties;
  rest?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

const CButton: React.FC<IPropsCButton> = ({
  name = 'Help',
  onClick,
  style,
  rest
}) => { 
  return (
    <>
      <button 
        onClick={onClick} 
        className={styles.btnCheckout}  
        style={style}
        {...rest}
      >
        {name}
      </button>
    </>
  );
}

export default CButton;
