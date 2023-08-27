import React,{useState,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faEllipsisVertical,
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Row, Card, Table, NavDropdown, Button, Badge } from "react-bootstrap";
import "./table.css";
import manimg from "../../assest/a.jpeg";
import { BASE_URL } from "../../services/helper";
import {NavLink} from "react-router-dom";
import {deleteuser} from "../../services/Apis";


const Tables = (props) => {
  //here we can also write props.userdata but we did object destructing

  const [fetchData, setFetchData] = useState();

  const deleteUser = async(id)=>{
     const response =  await  deleteuser(id);

     if(response.status == 200){
       alert("deleted..")
     }
  }

  useEffect(()=>{
    setFetchData(props.userdata.data);
  }, []);
  return (

    <>
     {/* <pre>{JSON.stringify(fetchData)}</pre> */}
      <div className="container">
        <Row>
          <div className="col mt-2">
            <Card className="shadow">
              <Table className="align-items-center" responsive="sm">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>Id</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Profile</th>
                    <th className="d-flex justify-content-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fetchData ? (
                    [...fetchData].reverse().map((element, index) => {
                      return (
                        <>
                          <tr>
                            {/* <td>{index+1}</td> */}
                            <td>{element._id.substr(element._id.length-4)}</td>
                            <td>{element.fname} {element.lname}</td>
                            <td>{element.email}</td>
                            <td>{element.gender}</td>
                            <td className="d-flex align-items-center">
                              <NavDropdown
                                title={
                                  <Badge bg={element.status == "Active" ? "primary" : "danger"}>
                                    {element.status}{" "}
                                    <FontAwesomeIcon
                                      icon={faAngleDown}
                                      size="xl"
                                    />
                                  </Badge>
                                }
                                className="text-center dropdown_btn"
                                id="basic-nav-dropdown"
                              >
                                <NavDropdown.Item href="#action/3.1">
                                  Ative
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                  InActive
                                </NavDropdown.Item>
                              </NavDropdown>
                            </td>
                            <td className="img_parent">
                              <img src={`${BASE_URL}/uploads/${element.image}`} alt="" srcset="" />
                            </td>
                            <td
                              className="d-flex align-items-center"
                              id="verticalDot"
                            >
                              <NavDropdown
                                title={
                                  <Badge bg="" className="text-center">
                                    {" "}
                                    <FontAwesomeIcon
                                      icon={faEllipsisVertical}
                                      id="ellipsisVertical"
                                      size="xl"
                                      color="black"
                                    />
                                  </Badge>
                                }
                                className="text-center dropdown_btn"
                                id="basic-nav-dropdown"
                              >
                                <NavDropdown.Item>
                                 <NavLink to={`/userprofile/${element._id}`} className="text-decoration-none text-black fw-bold"> <FontAwesomeIcon icon={faEye} color="green" />{" "}
                                  View</NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                <NavLink to={`/edit/${element._id}`} className="text-decoration-none text-black fw-bold">
                                  <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    color="blue"
                                  />{" "}
                                  Edit
                                  </NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                <NavLink  onClick={() => deleteUser(element._id)} className="text-decoration-none text-black fw-bold">
                                  <FontAwesomeIcon icon={faTrash} color="red" />{" "}
                                  Delete
                                  </NavLink>
                                </NavDropdown.Item>
                              </NavDropdown>
                            </td>
                          </tr>
                        </>
                      );
                    })j8d yw ygd nrei mnytdd  m,cedw
                  ) : (
                    <div className="no-data text-center">No Data Found</div>
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </div>
    </>
  );
};

export defaultj7e , uj97  Tables;
