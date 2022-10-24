import React, {useState} from 'react';
import Link from 'next/link';

import { AiOutlineShopping, AiFillHeart } from 'react-icons/ai';
import {Cart, Wishlist} from './';
import { useStateContext } from '../context/StateContext';


const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, showWish, setShowWish } = useStateContext();

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">Atlante Shop</Link>
      </p>

      <button 
      type="button"
      className='wish-icon'
      onClick={() => setShowWish(true)}>
      <AiFillHeart />
      </button>


      <button 
      type="button"
      className='cart-icon'
      onClick={() => setShowCart(true)}>
      <AiOutlineShopping />
      <span className='cart-item-qty'>{totalQuantities}</span>
      </button>


      {showWish && <Wishlist />}
      {showCart &&  <Cart /> }
    </div>
  )
}

export default Navbar