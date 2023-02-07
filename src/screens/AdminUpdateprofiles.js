import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  adminUpdateEmployeeProfiles,
  getIndividualEmployeeProfiles,
} from "../actions/adminActions";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Message from "../components/Message";

const baseURL = process.env.REACT_APP_BACKEND_BASEURL;

export default function AdminUpdateprofiles() {
  const { employeeId } = useParams();
  const dispatch = useDispatch();
  const updateprofiles = useSelector(
    (state) => state.getIndividualEmployeeProfiles
  );
  const responseStatus=useSelector((state)=>state. updateProfiles.update)

  const { error, loading, updateProfiles } = updateprofiles;
  const employeeUpdateprofiles = updateProfiles ? updateProfiles : null;
  const [getIndividualdata, setgetIndividualdata] = useState({});
  const [image, setImage] = useState({ profile_image: "" });
  const [editProfiles, setEditprofiles] = useState({});

  const handleImage = (e) => {
    setEditprofiles({ ...editProfiles, profile_image: e.target.files[0].name });
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setgetIndividualdata(e.target.value);
    setEditprofiles({ ...editProfiles, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    if (image && image.name) {
      setEditprofiles({ ...editProfiles, profile_image: image.name });

      dispatch(adminUpdateEmployeeProfiles(employeeId, editProfiles));
    } else {
      setEditprofiles(editProfiles);
      dispatch(adminUpdateEmployeeProfiles(employeeId, editProfiles));
       
    }
  };

  useEffect(() => {
    setgetIndividualdata(updateprofiles.updateProfiles);
  }, [updateprofiles]);

  useEffect(() => {
    dispatch(getIndividualEmployeeProfiles(employeeId));
  }, [dispatch,responseStatus]);

  return (
    <div class="row">
      <Header />
      {error && (
        <Message>
          Something's Broke But You Are Lucky Its Not Your Heart So We Can Fix
          It
        </Message>
      )}
      {loading && <Loader />}
      <div style={{ marginLeft: "100px" }}>
        <div
          class="card card-outline-info text-xs-center"
          style={{
            maxWidth: "70rem",
            marginTop: "10px",
            background: "white",
            borderRadius: "5%",
          }}
        >
          <div class="card-body p-6 p-md-7">
            <div class="container-lg">
              <div class="row">
                <br />
                <br />
                <h4 style={{ textAlign: "center", color: "black" }}>
                  Edit Profiles
                </h4>
                <br />

                <div
                  style={{
                    marginLeft: "-300px",
                    marginTop: "60px",
                    textAlign: "center",
                  }}
                  class="container-lg"
                >
                  <div>
                    <img
                      src={`${baseURL}${employeeUpdateprofiles.profile_image}`}
                      alt=""
                      class="card-img-top"
                      style={{ width: "220px", height: "200px" }}
                      className="rounded-circle"
                    />
                    <br />
                    <br />
                    <p
                      className="fw-bold"
                      style={{ color: "black", fontWeight: "bold" }}
                      class="text-capitalize"
                    >
                      {employeeUpdateprofiles.username}
                    </p>
                    <p>{employeeUpdateprofiles["email"]}</p>
                    <div class="custom-file">
                      <input
                        style={{ maxWidth: "100px" }}
                        type="file"
                        class="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                        name="profile_image"
                        onChange={handleImage}
                        value={image.profile_image}
                      />
                      <label
                        class="form-label"
                        for="form3Example1cg"
                        style={{ color: "black" }}
                      >
                        profileImage
                      </label>
                    </div>
                  </div>
                </div>
                <div style={{ marginLeft: "450px", marginTop: "-350px" }}>
                  <div class=" col-md-8">
                    <label class="form-label" for="form3Example1cg">
                      Username
                    </label>
                    <br />
                    <input
                      type="text"
                      name="username"
                      class="border border-dark p-2 mb-2"
                      id="exampleFormControlInput1"
                      value={getIndividualdata["username"]}
                      style={{ borderColor: "rgba(var(--bs-success-rgb)" }}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    class=" col-md-8"
                    style={{ marginLeft: "250px", marginTop: "-75px" }}
                  >
                    <label>Email</label>
                    <br />
                    <input
                      type="email"
                      name="email"
                      class="border border-dark p-2 mb-2"
                      id="exampleFormControlInput1"
                      value={getIndividualdata["email"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Location</label>
                    <br />
                    <input
                      style={{ width: "474px" }}
                      name="location"
                      type="text"
                      class="border border-dark p-2 mb-2"
                      id="exampleFormControlInput1"
                      value={getIndividualdata["location"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Designation</label>
                    <br />
                    <input
                      style={{ width: "474px" }}
                      name="designation"
                      type="text"
                      class="border border-dark p-2 mb-2"
                      id="exampleFormControlInput1"
                      value={getIndividualdata["designation"]}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label>Bio</label>
                    <br />
                    <input
                      style={{ width: "474px" }}
                      name="bio"
                      type="text"
                      class="border border-dark p-2 mb-2"
                      id="exampleFormControlInput1"
                      value={getIndividualdata["bio"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Contact.no</label>
                    <br />
                    <input
                      name="contact_no"
                      style={{ width: "474px" }}
                      type="number"
                      class="border border-dark p-2 mb-2"
                      id="exampleFormControlInput1"
                      value={getIndividualdata["contact_no"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>EmployeeId</label>
                    <br />
                    <input
                      name="employeeid"
                      style={{ width: "474px" }}
                      type="text"
                      class="border border-dark p-2 mb-2"
                      id="exampleFormControlInput1"
                      value={getIndividualdata["employee_id"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>DOB</label>
                    <br />
                    <input
                      name="dob"
                      style={{ width: "474px" }}
                      type="dob"
                      class="border border-dark p-2 mb-2"
                      id="exampleFormControlInput1"
                      value={getIndividualdata["dob"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div class=" col-md-6">
                    <label>Alternate_contact</label>
                    <br />
                    <input
                      name="alternate_contact"
                      type="text"
                      class="border border-dark p-2 mb-2"
                      id="exampleFormControlInput1"
                      value={getIndividualdata["alternate_contact"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    class=" col-md-6"
                    style={{ marginLeft: "250px", marginTop: "-75px" }}
                  >
                    <label>Blood group</label>
                    <br />
                    <input
                      name="blood_group"
                      type="text"
                      class="border border-dark p-2 mb-2"
                      id="exampleFormControlInput1"
                      value={getIndividualdata["blood_group"]}
                      onChange={handleChange}
                    />
                  </div>
                  <br />
                  <button
                    type="submit"
                    class="rounded-pill"
                    style={{
                      backgroundColor: "black",
                      width: "100px",
                      height: "45px",
                      color: "white",
                      fontSize: "12px",
                      marginLeft: "180px",
                    }}
                    onClick={handleClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-save"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                    </svg>
                    &nbsp; SAVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
