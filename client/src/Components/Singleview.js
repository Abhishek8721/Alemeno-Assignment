import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
function Singleview() {
    const currentUser = useSelector(state=>state.user.user);
    const [data, setData] = useState("")
    const [enroll, setEnroll] = useState(false)
    const param = useParams()
    useEffect(() => {
        async function getData() {
            const result = await axios.get("http://localhost:8000/singlecourse?id=" + param.id)
            console.log(result.data);
            setData(result.data.data)
           setEnroll(false)
        }
        getData()
    }, [param.id,enroll])
    async function addStudent(id){
        const result = await axios.post("http://localhost:8000/addstudent",{
            id:id
        })
        console.log(result.data);
        setEnroll(true)
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <img src={data.thumbnail} className="singleimg" />
                        <div className="author">
                            <div className="authorData">
                                <span className="text-left"> Duration:</span><span>{data.duration}</span>
                            </div>
                            <div className="authorData">
                                <span className="text-left"> Location:</span><span>{data.location}</span>
                            </div>
                        </div>
                        <h3>{data.name} by {data.instructor}</h3>
                        <h5>Course Content</h5>
                        <div className="accordion" id="accordionExample">
                            {
                                data.syllabus?.map(e => {
                        
                                    return (
                                        <>
                                            <div class="accordion-item">
                                                <h2 class="accordion-header">
                                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collaps"+e._id} aria-expanded="true" aria-controls={"collaps"+e._id}>
                                                        {e.topic}
                                                    </button>
                                                </h2>
                                                <div id={"collaps"+e._id} class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body">
                                                    {e.content}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                        
                                    )
                                })
                            }

                        </div>
                        <div class="d-grid col-3 mx-auto">
                            {
                               data.srudents?.includes(currentUser._id) ? (
                                    <button className="btn btn-secondary" disabled>Enrolled</button>
                                ):(
                                    <button className="btn btn-primary" onClick={()=>addStudent(data._id)}>Enroll</button>
                                )
                            }
                       
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Singleview