import React from 'react'
import Burger from '../components/Burger.jpg'
import Momos from '../components/momos.jpg'
import Pizza from '../components/Pizza.jpg'

function Carousel() {
    return (
        <>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" >
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{zIndex: "5"}}>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active h-300 w-300">
                        <img src={Pizza} className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..." />
                    </div>
                    <div className="carousel-item h-300 w-300">
                        <img src={Momos} className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..." />
                    </div>
                    <div className="carousel-item h-300 w-300">
                        <img src={Burger} className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..." />
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
        </>
    )
}

export default Carousel
