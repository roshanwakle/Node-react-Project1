import React, { useEffect, useState } from 'react'
import monitor from '../images/monitor.jpg'
import office from '../images/office.jpg'
import efg from '../images/efg.jpg'
import axios from 'axios'
import "../carouser/carouser.css"
export const Carouser = () => {
  const [carouser, setCarouser] = useState("");

  console.log(carouser, "carouser");

  const getBannerApi = async () => {
    const response = await axios.get(`http://localhost:8080/api/getBanner`)
    if (response.status === 200) {
      setCarouser(response.data.message)
    }
  }

  useEffect(() => {
    getBannerApi()
  }, [])

  return (

    <div>
        <div className=''>
              <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src={office} style={{ height: "400px" }} class="d-block w-100" alt="..." />
                    <div class="carousel-caption d-none d-md-block">
                      <h5>First slide label</h5>
                      <p className='carouserDesc'>{carouser.description}</p>
                    </div>
                  </div>
                  <div class="carousel-item">
                <img src={efg} style={{ height: "400px" }} class="d-block w-100" alt="..." />
                <div class="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>Some representative placeholder content for the first slide.</p>
                </div>
              </div>
              <div class="carousel-item">
                <img src={monitor} style={{ height: "400px" }} class="d-block w-100" alt="..." />
                <div class="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>Some representative placeholder content for the first slide.</p>
                </div>
              </div> 
                  <h1>{}</h1>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
        </div>
    </div>
  )
}


