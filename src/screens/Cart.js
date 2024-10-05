import React from 'react';
import Delete from '@mui/icons-material/Delete'; // Updated import for MUI icons
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  // If the cart is empty, display a message
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3' style={{color: 'white'}}>The Cart is Empty!</div>
      </div>
    );
  }
 

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    // Debugging step
    console.log("User Email:", userEmail); // For debugging
    console.log("Cart Data:", data);       // For debugging

    if (!userEmail || !data || data.length === 0) {
        console.error("Missing userEmail or cart data.");
        return; 
    }

    try {  
        let response = await fetch("http://localhost:5000/api/orderdata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,   
                order_date: new Date().toDateString(),
            }),
        });

        if (response.ok) {
            console.log("Order saved successfully.");
            dispatch({ type: "DROP" }); 
        } else {
            console.log("Failed to save order. Status:", response.status);
        }
    } catch (error) {
        console.error("Error occurred during checkout:", error);
    }
};




  // Calculate total price of items in the cart
  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md'>
        <table className='table table-hover '>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}> {/* Added key prop here */}
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <Delete onClick={() => dispatch({ type: "REMOVE", index: index })} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2' style={{color: 'white'}}>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' style={{color: 'white'}} onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
