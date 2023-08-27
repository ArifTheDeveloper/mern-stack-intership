import React,{useState,useEffect} from 'react'
import "./profile.css";
import Card from "react-bootstrap/Card";
import { Row} from 'react-bootstrap';
import manimg from '../../assest/a.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobile,faPerson,faLocationDot,faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import {singleUsergetfunc} from "../../services/Apis";
import { useParams } from 'react-router-dom';
import Spiner from "../../components/Spinner/Spiner";
import { BASE_URL } from "../../services/helper";
import moment from "moment";



const Profile = () => {

   

   
    const [getdata,setGetData] = useState({});
    const [showspin,setShowSpin] = useState(true);

    const {id} = useParams();
    
    const userProfileGet = async()=>{
        const response = await singleUsergetfunc(id);
        if(response.status === 200){
            setGetData(response.data);
        }
        else{
            console.log("error for get user data")
        }
     }

   
    
      useEffect(()=>{
        userProfileGet();
        setTimeout(()=>{
            setShowSpin(false)
        },1200)
      },[]);

    return (
        <>
        
        {
            showspin ? <Spiner/> :
           
             <div className="container">
                <Card className="card-profile shadow col-lg-6 mt-5 mx-auto">
                    <Card.Body>
                        <Row>
                            <div className="col">
                                <div className="card-profile-stats d-flex justify-content-center">
                                <img  src={`${BASE_URL}/uploads/${getdata.image}`} alt="" srcset="" />

                                </div>
                            </div>
                        </Row>
                        <div className="text-center">
                            <h3 className="mt-2">{getdata.fname}</h3>
                            <h4><FontAwesomeIcon icon={faEnvelope} size="sm" className="email"  />&nbsp;:- <span>{getdata.email}</span> </h4>
                            <h5><FontAwesomeIcon icon={faMobile} size="sm" className=""/>&nbsp;:- <span>{getdata.mobile}</span> </h5>
                            <h4><FontAwesomeIcon icon={faPerson} size="sm" className="" />&nbsp;:- <span>{getdata.gender}</span> </h4>
                            <h4><FontAwesomeIcon icon={faLocationDot} size="sm" className="location" />&nbsp;:- <span>{getdata.location}</span> </h4>

                            <h4>Status&nbsp;:- <span>{getdata.status}</span> </h4>
                            <h5><FontAwesomeIcon icon={faCalendarDays} className="calendar" /> Date Created&nbsp;:- <span>{moment(getdata.datacreated).format('MMM Do YYYY, h:mm:ss A')}</span> </h5>
                            <h5><FontAwesomeIcon icon={faCalendarDays} className="calendar" /> Date Updated&nbsp;:- <span>{getdata.dataupdated}</span> </h5>


                        </div>
                    </Card.Body>
                </Card>
            </div>
        }
       
        <pre>{JSON.stringify(getdata.data)}</pre>
        </>
    )
}

export default Profile;
