import React, { useEffect, useState, useRef} from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef=useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1); // State for quantity
    const [size, setSize] = useState(""); // State for size

    const handleAddtoCart = async () => {
        let finalPrice = qty * parseInt(options[size]); // Calculate the final price
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
        console.log(data);
    };
    let finalPrice=qty*parseInt(options[size]);

    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])
    return (
        <div>
            <div className="card m-3" style={{ width: "18rem", maxHeight: "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className="container w-100">
                        {/* Select for quantity */}
                        <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                );
                            })}
                        </select>

                        {/* Select for size */}
                        <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((sizeOption) => {
                                return <option key={sizeOption} value={sizeOption}>{sizeOption}</option>;
                            })}
                        </select>

                        <div className="d-inline h-100 fs-5">
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <button className="btn btn-success justify-center ms-2" onClick={handleAddtoCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default Card;
