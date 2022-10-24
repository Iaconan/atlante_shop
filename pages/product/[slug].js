import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar, AiFillHeart } from 'react-icons/ai';

import { client , urlFor } from '../../lib/client';
import {Product} from '../../components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation, A11y } from 'swiper';
import 'swiper/swiper-bundle.css';
SwiperCore.use([Navigation, Pagination, A11y]);


import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd, list } = useStateContext()

  return (
    <div>
        <div className='product-detail-container'>
        <div>
            <div className='image-container'>
                <img src={urlFor(image && image[index])} className='product-detail-image' />
            </div>
        <div className='small-images-container'>
        {image?.map((item, i) => (
            <img 
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
            />
        ))}
        </div>
        </div>

        <div className="product-detail-desc">
        <div className='wish'>
            <h1>{name}</h1>
            <button 
            type="button"
            className='cart-icon-wish'
            onClick={() => list(product)}>
            <span className='border-bottom-wish'>Wishlist</span>
            
            </button>
        </div>
        
            <div className='reviews'>
            <div>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            </div>
            <p>
                (20)
            </p>
            </div>
            <div className='price-box'>
            <p className="price">${price}</p>
            </div>
            <h4>Details: </h4>
            <p className='details'>{details}</p>
            <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
                <span className="minus" onClick={decQty}><AiOutlineMinus />
                </span>
                <span className="num" onClick="">{qty}
                </span>
                <span className="plus" onClick={incQty}><AiOutlinePlus />
                </span>
            </p>
            </div>
            <div className='buttons'>
            <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>
                Add to Cart
            </button>
            <button type='button' className='buy-now' onClick={() => {}}>
                Buy Now
            </button>
            
            </div>
        </div>
        </div>
        <div className='maylike'>
        <h2 className='maylike-title'>You may also like</h2>

        </div>
           
        <>
        <Swiper
        breakpoints={{
    380: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 3,
    },
  }}
    spaceBetween={30}
    slidesPerView={2}
    navigation
    pagination={{
       clickable: true,
       el: `swiper-container swiper-container-testClass`,
       bulletClass: `swiper-pagination-bullet swiper-pagination-testClass`
    }}
    wrapperTag='ul'
    
>
            {products.map((item, index) => (
                <SwiperSlide key={`slide_${ index }`}>
                <Product key={item._id} product={item} />
                </SwiperSlide>
            ))}
            </Swiper>

        </>


           
    </div>
  )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug{
            current
        }
    }`;

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
  
  
    return {
      props: { products, product } 
    }
  }

export default ProductDetails