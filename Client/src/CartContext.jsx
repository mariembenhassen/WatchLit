import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext  = createContext();

export function CartProvider({children}){
    const [ cart , setCart] = useState( () =>{
       const stored = localStorage.getItem("cart");
       return stored? JSON.parse(stored) : []
    }
    )
    //to persist the data to local storage 
     useEffect(()=>{
      localStorage.setItem("cart" , JSON.stringify(cart)); //localStorage only stores strings, not arrays or objects.
     },[cart]
     );

    //to add items in to cart 
    const addItem = (item) =>{
        setCart((prev) =>{
            //check if its duplicated 
            const existing = prev.find((p)=> p.id === item.id);
            if(existing){
                return prev.map((p) =>
                p.id === item.id 
                ? { ...p , qty: p.qte +1 }
                : p   // leave all other items unchanged
                )
            }
            return [...prev , {...item , qty:1}];
        });
    };

    //to increase value of items in cart 
    const increment=(id)=>{
        setCart((prev)=>{
            prev.map((p)=>{
                p.id === id
                ?{...p , qty : p.qty +1}
                :p
            })
        }

        )
    }
    //to decrease the value if 0 then remove from the cart 
    const decrement= (id)=>{
        setCart(
            (prev) => {
            prev.map((p)=>{
                p.id === id 
                ?{...p , qty: p.qty-1}
                :p
            }).filter((p)=>p.qte>0) //remove the items from cart with qte = 0 
            }
        )
    }

    // to remove item immediatly from cart 
    const removeItems = (id) => {
        setCart((prev)=>{
            prev.filter((p)=> p.id !== id);
        })
    }
    // to clear cart complitely

    const clearCart=()=>{
        setCart([]);
    }

    //helper function 
        // helper: robust price parser
  const parsePrice = (price) => {
    if (typeof price === "number" && isFinite(price)) return price;
    if (!price) return 0;
    // convert to string and strip currency symbols, spaces, and letters,
    // keep digits, minus and dot. remove commas.
    let s = String(price).trim();
    // remove all characters except digits, dot, minus
    s = s.replace(/[^0-9.]/g, "");
    // if multiple dots, keep first dot only
    const parts = s.split(".");
    if (parts.length > 2) {
      const first = parts.shift();
      s = first + "." + parts.join("");
    }
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : 0;
    } ; // check the number is right correct for sum or not 

    //totals
    const totalItems = cart.reduce((sum ,p) => sum+(p.qty || 0) , 0); // return total watever items in the cart .
    const totalPrice = cart.reduce(
        (sum, p) => sum + ((p.qty || 0) * parsePrice(p.price)),
         0
    );



    return (
     <CartContext.Provider 
     value={{
      cart,
      addItem,
      increment,
      decrement,
      removeItems,
      clearCart,
      totalItems,
      totalPrice
     }}
     >
        {children}
     </CartContext.Provider>
    )

}
export const useCart = () => useContext(CartContext);
