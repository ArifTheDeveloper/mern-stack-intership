import React,{useEffect, useState} from 'react';
import "./edit.css";
import Card from "react-bootstrap/Card";
import {Form, Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import manimg from '../../assest/a.jpeg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {singleUsergetfunc,editfunc} from "../../services/Apis";
import { useParams } from 'react-router-dom';
import { BASE_URL } from "../../services/helper";
import {useNavigate} from "react-router-dom";


const Edit = () => { 
    
    const [inputdata, setInputData] = useState({
     fname : "",
     lname : "",
     email : "",
     mobile : "",
     gender : "",
     location : ""
    });

    const [status,setStatus] = useState("Active");
    const [image, setImage] = useState("");
    const [preview,setPreview] = useState("");
    const [imgdata,setImgdata] = useState("");

    

    const navigate = useNavigate();

    //fetching single user data from  server
    const {id} = useParams();
  
   
    // status options
    const options = [
        {
            value: 'Active',
            label: 'Active'
        }, {
            value: 'InActive',
            label: 'InActive'
        },
    ];

 // setInput Value
 const setInputValue = (event)=>{
    setInputData({
        ...inputdata,
        [event.target.name] : event.target.value
    })
 }

 //state set
 const  setStatusValue = (event) =>{
    setStatus(event.value);
 }

//profile set
const setProfile = (event) =>{
    setImage(event.target.files[0]);
}

//fetch data
const userProfileGet = async()=>{
    const response = await singleUsergetfunc(id);
    if(response.status === 200){
        setInputData(response.data);
        setStatus(response.data.status);
        setImgdata(response.data.image)
    }
    else{
        console.log("error for get user data")
    }
 }



// submit userdata
const submitUserData = async(event) =>{
    event.preventDefault();
    const {fname,lname,email,mobile,gender,location} = inputdata;

    if(fname === "" ){
        toast.error("First name is  required !"); 
    }else if(lname === ""){
        toast.error("Last name is  required !"); 
    }else if(email === ""){
        toast.error("Email  is  required !"); 
    }else if(!email.includes("@")){
        toast.error("Enter Valid Email !"); 
    }
    else if(mobile === ""){
        toast.error("Mobile is  required ! "); 
    }else if(mobile.length > 10){
        toast.error("Enter valid Mobile ! "); 
    }
    else if(gender === ""){
        toast.error("Gender is  required !"); 
    }else if(location === ""){
        toast.error("Location is  required !"); 
    }else if(image === ""){
        toast.error("Profile is  required !"); 
    }
    else{

        const data = new FormData();
        data.append("fname",fname)
        data.append("lname",lname)
        data.append("email",email)
        data.append("mobile",mobile)
        data.append("gender",gender)
        data.append("status",status)
        data.append("user_profile",image || imgdata) // user_profile and multer ka single("user_profile") same hoga chhiye
        data.append("location",location)

        const config = {
           "Content-Type" : "multipart/form-data"
        }

        const response = await editfunc(id,data,config);
        if(response.status == 200){
            navigate("/");
        }
         //api call
        //  toast.success("Registration successfully done !");
    }
}


useEffect(()=>{
    userProfileGet();
  },[id]);

useEffect(()=>{
  if(image){
    setImgdata("");
    setPreview(URL.createObjectURL(image));
  }
},[image]);


    return (
        <>
      <pre>{JSON.stringify(imgdata)}</pre>
            <div className="container">
                <h2 className="text-center mt-1">Update Your Details</h2>
                <Card className="shadow mt-3 p-3">
                    <div className="profile_div ">
                        <img src={image ? preview :`${BASE_URL}/uploads/${imgdata}`} alt="img" srcset=""/>
                    </div>

                    <Form >
                        <Row>
                            <Form.Group className="mb-3 col-lg-6" controlId="formGroupEmail">
                                <Form.Label>First name</Form.Label>
                                <Form.Control onChange={setInputValue} value={inputdata.fname} name="fname" type="text" placeholder="First Name"/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formGroupEmail">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control onChange={setInputValue} value={inputdata.lname} name="lname" type="text" placeholder="First Name"/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formGroupEmail">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control onChange={setInputValue} value={inputdata.email}  name="email" type="email" placeholder="First Name"/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formGroupMobile">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control onChange={setInputValue} value={inputdata.mobile} name="mobile" type="text" placeholder="Enter Mobile"/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formGroupMobile">
                                <Form.Label>Select Your Gender</Form.Label>
                                <Form.Check type={"radio"}
                                    label={`Male`}
                                    onChange={setInputValue}
                                    name="gender"
                                    value={"Male"}
                                    checked={inputdata.gender == "Male" ? true : false}
                                    />
                                <Form.Check type={"radio"}
                                    label={`Female`}
                                    onChange={setInputValue}
                                    name="gender"
                                    value={"Female"}
                                    checked={inputdata.gender == "Female" ? true : false}
                                    />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formGroupCheckBox">
                                <Form.Label>Select Your Status</Form.Label>
                                <Select onChange={setStatusValue} defaultValue={status} options={options} />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formGroupEmail">
                                <Form.Label>Select Your Profile</Form.Label>
                                <Form.Control onChange={setProfile} type="file" name="user_profile"/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formGroupEmail">
                                <Form.Label>Enter Your Location</Form.Label>
                                <Form.Control onChange={setInputValue} value={inputdata.location} type="text" name="location" placeholder="Enter Your Location"/>
                            </Form.Group>
                            
                           

                            <Button onClick={submitUserData} variant="primary" type="submit">Submit</Button>
                        </Row>
                    </Form>
                </Card>

                <ToastContainer position="top-center"/>


            </div>
        </>
    )
}


export default Edit;
