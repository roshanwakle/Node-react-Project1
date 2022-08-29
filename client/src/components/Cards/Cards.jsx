import '../Cards/Cards.css'
import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate'
import { Link, useNavigate } from "react-router-dom";
import abc from '../images/abc.jpg'
import axios from 'axios'
export const Cards = () => {
    const [data, setData] = useState([])
    const [pageNumber,setPageNumber] = useState(0)
    const navigate = useNavigate();

    const userPerPage = 5;
    const pageVisited = pageNumber * userPerPage
    const displayEmployee = data.slice(pageVisited,pageVisited + userPerPage).map(item =>{
        return(
            
            <div class="card" onClick={(e)=>changeCard(e.target.value)}>
                <h1 className='EmpId'>AIT- {item.empId}</h1>

           <div  class="image">
               <img  src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" />
           </div>
           <div className="title">
               
           <h1> {item.firstName}</h1>
           </div>
           <div className="des">
               <h1>{item.lastName}</h1>
           </div>
       </div>
           )
    })


    const getAllUsers = async (e) => {
        const response = await axios.get(`http://localhost:8080/api/empUser/getEmp`)
        if (response.status === 200) {
            setData(response.data.message)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, []);

    const changeCard =(card) =>{
        console.log("clicked");
        navigate("/CardInfo");
        localStorage.setItem("name",card);
    }

    const pageCount = Math.ceil((data.length / userPerPage))

    const chagePage = ({selected})=> {
        setPageNumber(selected)
    }
    return (
       <>
        <div className='main'>
            
            {displayEmployee}
            <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={chagePage}
            containerClassName={'paginationBttns'}
            previousLinkClassName={"previousLink"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisable"}
            activeClassName={"paginationActive"}
            />
        </div>
       </>
    )
}



// {data.map((item,index)=>{
//     return(
//      <div class="card" onClick={(e)=>changeCard(e.target.value)}>

//     <div class="image">
//         <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Gfp-missouri-st-louis-clubhouse-pond-and-scenery.jpg/1199px-Gfp-missouri-st-louis-clubhouse-pond-and-scenery.jpg" />
//     </div>
//     <div class="title">
        
//     <h1> {item.firstName}</h1>
//     </div>
//     <div class="des">
//         <h1>{item.lastName}</h1>
//     </div>
// </div>
//     )
//  })}