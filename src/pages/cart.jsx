import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"

export default function Cart() {
  const { carts, updateQuantity, removeItem, totalAmount, checkOut } = useCart();
  
  return (
    <>
      {(carts.length !== 0) && (
        <div className="className='py-28 container-xl text-black/80'">
          <h1 className='text-2xl font-bold tracking-wide text-center'>YOUR CART</h1>
          <table className="w-full mt-20 font-medium table-fixed border-spacing-y-4 min-w-[550px]">
            <colgroup>
              <col style={{ width: '40%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>

            <thead>
              <tr className="text-left">
                <th className="pb-2">ITEM</th>
                <th className="pb-2">PRICE</th>
                <th className="pb-2">QUANTITY</th>
                <th className="pb-2">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((item, index) => (
                <tr key={index} className="border-t-3 border-t-gray-200">
                  
                  {/* item details */}
                  <td className="py-8 pr-2 md:pr-4">
                    <div className="flex flex-col gap-2 md:gap-4 md:flex-row item-center">
                      <div className="flex-shrink-0 px-8 py-4 overflow-hidden border-gray-200 border-6 group hover:border-blue-300">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="h-[50px] w-[50px] mx-auto duration-300 group-hover:scale-105 drop-shadow-lg drop-shadow-black/80"
                        />
                      </div>
                      <p className="self-center text-center md:text-left">{item.title}</p>
                    </div>
                  </td> 

                  {/* display price */}
                  <td className="py-8 pr-2 md:pr-4">
                    &euro;{(item.price).toLocaleString()}
                  </td> 

                  {/* update quantity */}
                  <td className="py-8 pr-2 md:pr-4">
                    <div className="flex items-center">
                      <button
                        className="p-2 border"
                        onClick={() => {
                          if(item.quantity === 1){
                            const check = confirm('Are you sure you want to remove this from your cart?');
                            if(check) {
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          } else {
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        }}
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        value={item.quantity} 
                        className="w-10 p-2 border appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none outline-none"
                        onChange={(e) => {
                          const value = e.target.value;
                          if(value == "") return;
                          updateQuantity(item.id, Number(value))
                        }}
                      />
                      <button
                        className="p-2 border"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>          

                  {/* remove item */}
                  <td className="py-8 pr-4">
                    <div className="flex items-center justify-between">
                      <p>&euro;{(item.price * item.quantity).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </p>
                      <button
                        className="px-4 py-2 text-sm font-medium underline duration-300 rounded-md cursor-pointer hover:bg-red-900 hover:text-white hover:underline-white"
                        onClick={() => {
                            const check = confirm('Are you sure you want to remove this from your cart?');
                            if(check) {
                              removeItem(item.id);
                            }
                          }
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </td> 
                </tr>
              ))}
            </tbody>
          </table>
    
          <div className="block mt-10 ml-auto w-max">
            <div className="flex gap-2">
              <sup className="text-lg font-bold uppercase">
                Subtotal
              </sup>
              <p className="text-3xl font-bold">
                &euro;{totalAmount().toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
            </div>

            <p className="py-2 text-sm border-gray-200 border-b-3">
              Shipping and taxes computed at checkout
            </p>

            <button 
              onClick={() => checkOut()}
              className="block px-8 py-2 mt-10 ml-auto text-lg text-white duration-500 bg-black cursor-pointer hover:bg-blue-500"
            >
              CHECKOUT
            </button>
      
            <Link 
              to="/products"
              className="block mt-4 text-lg text-right underline"
            >
              Keep shopping
            </Link>
          
          </div>
        </div>
      )};

      {carts.length === 0 && noCart()}
    </>
  )
}

function noCart() {
  return (
    <div 
      className="flex flex-col items-center justify-center w-full gap-4 h-dvh text-black/80"
    >
      <h1 className="text-xl font-bold md:text-3xl">
        Your cart is looking empty
      </h1>
      <Link 
        to="/products"
        className="text-lg underline cursor-pointer underline-offset-4"
      >
        Shop now
      </Link>
    </div>
  )
}
