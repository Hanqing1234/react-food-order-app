import {useContext} from "react";

import CartContext from "../../store/CartContext";
//import CartIcon from "../Cart/CartIcon";
import { AiOutlineShoppingCart } from 'react-icons/ai';

import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const numberOfCartItem = cartCtx.item.reduce((curNumber, item) => {
    return curNumber + item.amount
  },0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
      <AiOutlineShoppingCart />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  );
};

export default HeaderCartButton;
