import React from 'react';
import Link from 'next/link';
import { AiOutlineLeft, AiOutlineCloudUpload } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import { Cart } from './';

const Whishlist = () => {
  const { listItems, setShowWish,  removeList } = useStateContext();


  return (
    <div className='cart-wrapper'>
    <div className='cart-container'>
      <button
      type="button"
      className='cart-heading'
      onClick={() => setShowWish(false)}>
      <AiOutlineLeft />
      <span className='heading'>Your Wishlist</span>
      </button>

      {listItems.length < 1 && (
        <div className='empty-cart'>
        <AiOutlineCloudUpload size={150} />
        <h3>Your Whishlist is empty</h3>
        <Link href="/">
          <button
          type="button"
          onClick={() => setShowWish(false)}
          className='btn'>
          Continue Shopping
          </button>
        </Link>
        </div>
      )}

      <div className='product-container'>
          {listItems.length >= 1 && listItems.map((item) => (
            <div className='product' key={item._id}>
              <img src={urlFor(item?.image[0])}
                className='cart-product-image'
              />
              <div className='item-desc'>
              <div className='flex top'>
              <h5>{item?.name}</h5>
              <h4>${item?.price}</h4>
              </div>
              <div className='flex bottom'>
              <div>
              <button type='button' className='buy-now' onClick={() => {}}>
                Buy Now
            </button>
              </div>
              <button
              type='button'
              className='remove-item'
              onClick={() => removeList(item)}>
              <TiDeleteOutline />
              </button>
              </div>
              </div>
            </div>
          ))}

      </div>
      
    </div>
    </div>
  )
}

export default Whishlist