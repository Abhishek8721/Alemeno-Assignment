import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Card from './Card'
function Homepage() {
    const [courses, setCourses] = useState([])
    const [search, setSearch] = useState("")
    useEffect(() => {
        async function getData() {
            try {
                const result = await axios.get("http://localhost:8000/getcourse")
                console.log(result);
                setCourses(result.data.data)

            } catch (error) {
                console.log(error);
            }
        }
        getData()
    },[])
    async function searchData() {
        console.log(search);
       const result = await axios.post("http://localhost:8000/search",{
            name:search
        })
        console.log(result);
        setCourses(result.data)
    }
    return (
        <div className='container'>
            <form className="d-flex align-items-center justify-content-center my-3" role="search" >
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{width:"500px"}} onChange={e=>setSearch(e.target.value)}/>
                <button className="btn btn-outline-success" type="button" onClick={searchData}>Search</button>
            </form>


            <div className='container d-flex flex-wrap'>





                {
                    courses?.map(e => {
                        return (
                            <Card data={e} />
                        )

                    })
                }

            </div>
        </div>
    )
}
export default Homepage