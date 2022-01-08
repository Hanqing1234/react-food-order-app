import {useContext, useEffect, useState} from "react";

import CartContext from "../../store/CartContext";
//import CartIcon from "../Cart/CartIcon";
import { AiOutlineShoppingCart } from 'react-icons/ai';

import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberOfCartItem = cartCtx.item.reduce((curNumber, item) => {
    return curNumber + item.amount
  },0);


  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if(cartCtx.item.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
      <AiOutlineShoppingCart />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  );
};

export default HeaderCartButton;
