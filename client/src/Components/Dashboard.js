import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from './Card'
function Dashboard() {
    const [courses, setCourses] = useState([])
    const [user, setUser] = useState({})
    useEffect(() => {
        async function getData() {
            const result = await axios.get("http://localhost:8000/getstudent")
            console.log(result);
            setUser(result.data.user)
            setCourses(result.data.course)
        }
        getData()
    }, [])
    return (
        <>
            <div className="container my-3">
                <div className="row">
                    <h3 style={{ color: "red" }}>User Dashboard</h3>
                    <div className="col-md-6">
                        <label for="exampleInputEmail1" className="form-label d-flex">Name</label>
                        <input type="text" className="form-control" value={user.name} readOnly />
                    </div>
                    <div className="col-md-6">
                        <label class="form-label d-flex">Email</label>
                        <input type="text" className="form-control" value={user.email} readOnly />
                    </div>
                    <h4 style={{ color: "red",marginTop:"20px" }}>Enrolled Courses</h4>
                    <div className="col-md-12 d-flex flex-wrap">
                        {
                            courses?.map(e => {
                                return (
                                    <Card data={e} />
                                )

                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard