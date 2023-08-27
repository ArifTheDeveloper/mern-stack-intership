import React,{useContext,useState,useEffect} from 'react'
import "./home.css";
import {Alert,Form, Row, Col, Button,NavDropdown} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus,faSort} from '@fortawesome/free-solid-svg-icons';
import  {useNavigate} from "react-router-dom";
import Tables from "../../components/Tables/Tables";
import {addData} from "../../components/context/ContextProvider";
import Spiner from "../../components/Spinner/Spiner";
import {usergetfunc} from "../../services/Apis";


const Home = () => {

    const navigate = useNavigate();

    const {useradd,setUseradd} = useContext(addData);

    const [userdata,setUserData] = useState([]);
    const [showspin,setShowSpin] = useState(true);

    const adduser = () =>{
        navigate('/register');
    }

     const userGet = async()=>{
        const response = await usergetfunc();
        if(response.status === 200){
            setUserData(response);
        }
        else{
            console.log("error for get user data")
        }
     }

    useEffect(()=>{
        userGet();
        setTimeout(()=>{
            setShowSpin(false)
        },1200)
      },[])
    
    return (
        <>
          {/* <pre>{JSON.stringify(userdata)}</pre> */}
        {
            useradd ?    <Alert variant="success" onClose={() => setUseradd("")} dismissible>
            <Alert.Heading>{useradd.fname.toUpperCase()} Successfully added.</Alert.Heading>  </Alert> : ""
        }
            <div className="container">
                <div className="main_div">
                    {/* Search add btn */}
                    <div className="search_add mt-4 d-flex justify-content-between">
                        <div className="search col-lg-4">
                            <Form inline>
                                <Row>
                                    <Col xs="auto">
                                        <Form.Control type="text" className="me-2" placeholder="Search"/>
                                    </Col>
                                    <Col xs="auto">
                                        <Button type="submit" className="search_btn">Submit</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>


                        <div className="add_btn">
                            <Button onClick={adduser}  type="submit" variant="primary" className="search_btn">
                                <FontAwesomeIcon icon={faPlus}/>&nbsp;Add User</Button>
                        </div>
                    </div>

                    {/* export ,gender, status */}
                    <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
                        <div className="export_csv">
                            <Button type="submit" className="export_btn">Export To Csv</Button>
                        </div>

                        <div className="filter_gender">
                            <div className="filter">
                                <h3>Filter By Gender</h3>
                                <div className="gender d-flex justify-content-around">
                                    <Form.Check type={"radio"}
                                        label={`All`}
                                        name="gender"
                                        value={"ALL"}
                                        defaultChecked/>
                                    <Form.Check type={"radio"}
                                        label={`Male`}
                                        name="gender"
                                        value={"Male"}/>
                                    <Form.Check type={"radio"}
                                        label={`Female`}
                                        name="gender"
                                        value={"Female"}/>
                                </div>
                            </div>
                        </div>

                        {/* short by value */}
                        <div className="filter_newold">
                            <h3>Short By Value</h3>
                            <NavDropdown title={<FontAwesomeIcon icon={faSort} />} className="text-center dropdown_btn" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">New</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Old</NavDropdown.Item>
                            </NavDropdown>
                        </div>

                        {/* filter by status */}
                        <div className="filter_status">
                          <div className="status">
                            <h3>Filter By Status</h3>
                            <div className="status_radio d-flex justify-content-around flex-wrap" >
                            <Form.Check type={"radio"}
                                    label={`All`}
                                    name="status"
                                    value={"All"}/>&nbsp;
                             <Form.Check type={"radio"}
                                    label={`Active`}
                                    name="status"
                                    value={"Active"}/>&nbsp;
                             <Form.Check type={"radio"}
                                    label={`InActive`}
                                    name="status"
                                    value={"InActive"}/>
                            </div>
                          </div>
                        </div>

                    </div>
                </div>
                {/* <Tables/> */}

                {
                       showspin ? <Spiner /> : <Tables  
                                                    userdata = {userdata}
                                                />
                }

            </div>

            
        </>
    )
}

export default Home;
