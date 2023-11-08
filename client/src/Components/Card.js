
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
function Card({data}) {
    return (
        <>
            <div className="card" style={{width:"500px",margin:"15px"}}>
                <img src={data.thumbnail} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{data.name} by {data.instructor}</h5>
                    <p className="card-text">{data.description}</p>
                    <Link to={`/singleview/${data._id}`} class="btn btn-primary">View</Link>
                </div>
            </div>
        </>
    )
}
export default Card