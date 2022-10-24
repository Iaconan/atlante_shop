import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [listItems, setListItems] = useState([]);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [qty, setQty] = useState(1);
    const [showWish, setShowWish] = useState(false);


    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item?._id === product?._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

        if(checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct?._id === product?._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems)
        } else {
            product.quantity = quantity;
            
            setCartItems([...cartItems, {...product}])
        }
        toast.success(`${qty} ${product.name} added to the cart. `)
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item?._id === product?._id)
        const newCartItems = cartItems.filter((item) => item?._id !== product?._id); 

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item?._id === id)
        index = cartItems.findIndex((product) => product?._id === id)

        const newCartItems = cartItems.filter((item) => item?._id !== id)

        if (value === 'inc') {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1}]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1) 
        } else if (value === 'dec') {
            if(foundProduct.quantity > 1) {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1}]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1) 
            }
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty -1 < 1) return 1;
            return prevQty - 1;
        });
    }

    const list = (product) => {
        const checkWishlist = listItems.find((itemList) => itemList?._id === product?._id);

        if(checkWishlist) {
            const updatedWhishlist = listItems.map((listProduct) => {
                if(listProduct?._id === product?._id) return {
                    ...listProduct
                    
                }
            })

            setListItems(updatedWhishlist)
        } else {
            

            setListItems([...listItems, {...product}])
        }
        toast.success(`${product.name} added to the Wishlist. `)
    }


    const removeList = (product) => {
        foundProduct = listItems.find((itemList) => itemList?._id === product?._id)
        const newListItems = listItems.filter((itemList) => itemList?._id !== product?._id); 

        
        
        setListItems(newListItems);
    }

    return (
        <Context.Provider
        value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuantity,
            onRemove,
            showWish,
            setShowWish,
            list,
            listItems,
            setListItems,
            removeList
        }}>
            {children}
        </Context.Provider>
    )
}


export const useStateContext = () => useContext(Context);



