import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Burger from '../components/Burger.jpg';
import Momos from '../components/momos.jpg';
import Pizza from '../components/Pizza.jpg';

function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch('http://localhost:5000/api/foodData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      // Update state with fetched data
      setFoodItem(data.food_items);
      setFoodCat(data.food_categories);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" >
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "5" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
              {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
            </div>
          </div>
          <div className="carousel-item active h-300 w-300">
            <img src={Pizza} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item h-300 w-300">
            <img src={Momos} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item h-300 w-300">
            <img src={Burger} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className='container'>
  {/* Check if foodCat has data before mapping */}
  {
    foodCat.length > 0
      ? foodCat.map((category) => (
        <div key={category._id}>
          <div className='fs-3 m-3'>
            {category.CategoryName}
          </div>
          <hr />
          <div className='row'>
            {
              foodItem && foodItem.length > 0 // Ensure foodItem exists and is non-empty
                ? foodItem
                  .filter((item) => item.CategoryName === category.CategoryName && 
                    item.name.toLowerCase().includes(search.toLowerCase())  // Correct case filtering
                  )
                  .map(filteredItem => (
                    <div key={filteredItem._id} className='col-12 col-md-6 col-lg-3 mb-3'>
                      <Card foodItem={filteredItem}
                        options={filteredItem.options[0]}
                        
                      />
                    </div>
                  ))
                : <div className='col-12'>No items found for this category</div>  // Fallback if no items are found
            }
          </div>
        </div>
      ))
      : <div>No categories found</div>  // Fallback if no categories are found
  }
</div>

      <Footer />
    </div>
  );
}

export default Home;
