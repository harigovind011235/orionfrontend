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
  const { error, loading, updateProfiles } = updateprofiles;
  const employeeUpdateprofiles = updateProfiles ? updateProfiles : null;

  const [getApicall, setGetApicall] = useState(false);
  const [errormsg, setErrormsg] = useState({
    email: "",
    contact_no: "",
    alternate_contact: "",
  });
  const [getIndividualdata, setgetIndividualdata] = useState({});
  const [checkedValue, setCheckedValue] = useState(
    employeeUpdateprofiles.status
  );

  const [image, setImage] = useState({ profile_image: "" });
  const [editProfiles, setEditprofiles] = useState({});

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const handleUploadimage = () => {
    if (image && image.name) {
      let formData = new FormData();
      formData.append("profile_image", image, image.name);
      dispatch(adminUpdateEmployeeProfiles(employeeId, formData));
    }
  };

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const handleChange = (e) => {
    if (
      e.target.name === "email" &&
      e.target.value &&
      e.target.value.match(isValidEmail)
    ) {
      setEditprofiles({ ...editProfiles, [e.target.name]: e.target.value });
      setErrormsg({ ...errormsg, [e.target.name]: "" });
    } else if (
      e.target.name === "email" &&
      e.target.value &&
      !e.target.value.match(isValidEmail)
    ) {
      setErrormsg({ ...errormsg, [e.target.name]: "enter the valid email" });
    } else if (
      (e.target.name === "contact_no" && e.target.value.length > 10) ||
      (e.target.name === "contact_no" && e.target.value.length < 10) ||
      (e.target.name === "alternate_contact" && e.target.value.length > 10) ||
      (e.target.name === "alternate_contact" && e.target.value.length < 10)
    ) {
      setErrormsg({ ...errormsg, [e.target.name]: "enter the valid number" });
    } else if (
      (e.target.name === "contact_no" && e.target.value.length === 10) ||
      (e.target.name === "alternate_contact" && e.target.value.length === 10)
    ) {
      setErrormsg({ ...errormsg, [e.target.name]: "" });
      setEditprofiles({ ...editProfiles, [e.target.name]: e.target.value });
    } else if (
      e.target.name !== "email" &&
      e.target.name !== "contact_no" &&
      e.target.name !== "alternate_contact"
    ) {
      setEditprofiles({ ...editProfiles, [e.target.name]: e.target.value });
    }

    setgetIndividualdata(e.target.value);
  };

  const handleCheckbox = () => {
    setCheckedValue(!checkedValue);
    setEditprofiles({ ...editProfiles, status: !checkedValue });
  };

  const handleClick = () => {
    setEditprofiles(editProfiles);
    if (
      Object.keys(editProfiles).length > 0 &&
      Object.values(errormsg).filter((el) => el !== "").length === 0
    ) {
      dispatch(adminUpdateEmployeeProfiles(employeeId, editProfiles));
      setErrormsg({});
      setEditprofiles({});
      setGetApicall(!getApicall);
    } else if (
      image &&
      image.name &&
      Object.values(errormsg).filter((el) => el !== "").length === 0
    ) {
      setGetApicall(!getApicall);
    }
  };

  useEffect(() => {
    setgetIndividualdata(updateprofiles.updateProfiles);
    setCheckedValue(updateprofiles.updateProfiles.status);
  }, [updateprofiles]);

  useEffect(() => {
    if (getApicall) {
      dispatch(getIndividualEmployeeProfiles(employeeId));
    }
    dispatch(getIndividualEmployeeProfiles(employeeId));
  }, [dispatch, getApicall]);

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
                    marginTop: "150px",
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
                        style={{ marginLeft: "100px" }}
                        type="file"
                        id="avatar"
                        accept="image/png, image/jpeg,image/jpg"
                        aria-describedby="inputGroupFileAddon01"
                        name="profile_image"
                        onChange={handleImage}
                      />

                      <br />
                      <br />
                      <button
                        class="rounded-pill"
                        style={{
                          backgroundColor: "black",
                          width: "90px",
                          height: "42px",
                          color: "white",
                          fontSize: "12px",
                        }}
                        onClick={handleUploadimage}
                      >
                        upload image
                      </button>
                    </div>
                  </div>
                </div>
                <div style={{ marginLeft: "450px", marginTop: "-500px" }}>
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
                    <label>employee_id</label>
                    <br />
                    <input
                      name="employee_id"
                      type="text"
                      class="border border-dark p-2 mb-2"
                      id="exampleFormControlInput1"
                      value={getIndividualdata["employee_id"]}
                      onChange={handleChange}
                      maxLength={8}
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
                      maxLength={50}
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
                      maxLength={50}
                    />
                  </div>

                  <div>
                    <label>Bio</label>
                    <br />
                    <textarea
                      style={{ width: "474px" }}
                      name="bio"
                      type="text"
                      class="border border-dark p-2 mb-2"
                      id="exampleFormControlInput1"
                      value={getIndividualdata["bio"]}
                      onChange={handleChange}
                      maxLength={200}
                    />
                  </div>
                  <div>
                    <label>Contact.no</label>
                    <br />
                    <input
                      className="n"
                      name="contact_no"
                      style={{ width: "474px" }}
                      type="number"
                      class="border border-dark p-2 mb-2"
                      id="exampleFormControlInput1"
                      value={getIndividualdata["contact_no"]}
                      onChange={handleChange}
                    />
                  </div>
                  <p style={{ color: "red" }}>{errormsg.contact_no}</p>
                  <div>
                    <br />
                    <label>Email</label>
                    <br />
                    <input
                      type="Email"
                      name="email"
                      style={{ width: "474px" }}
                      class="border border-dark p-2 mb-2 ,form-control"
                      id="exampleFormControlInput1"
                      value={getIndividualdata["email"]}
                      onChange={handleChange}
                      pattern=" /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i"
                      required
                    />
                    <p style={{ color: "red" }}> {errormsg.email}</p>
                  </div>
                  <br />
                  <div>
                    <label>DOB</label>
                    <br />

                    <input
                      name="dob"
                      style={{ width: "474px" }}
                      type="date"
                      class="date form-control"
                      className="border border-dark p-2 mb-2"
                      id="exampleFormControlInput1"
                      value={getIndividualdata["dob"]}
                      onChange={handleChange}
                    />
                  </div>
                  <br />
                  <div>
                    <label>Date of joining</label>
                    <br />

                    <input
                      name="date_of_joining"
                      style={{ width: "474px" }}
                      type="date"
                      class="date form-control"
                      className="border border-dark p-2 mb-2"
                      id="exampleFormControlInput1"
                      value={getIndividualdata["date_of_joining"]}
                      onChange={handleChange}
                    />
                  </div>
                  <br />
                  <div>
                    <label>status</label>
                    &nbsp;
                    <input
                      type="checkbox"
                      id="coding"
                      name="status"
                      value={checkedValue}
                      checked={checkedValue}
                      onChange={handleCheckbox}
                    />
                  </div>
                  <br />
                  <div class=" col-md-6">
                    <label>Alternate_contact</label>
                    <br />
                    <input
                      name="alternate_contact"
                      type="number"
                      class="border border-dark p-2 mb-2"
                      id="exampleFormControlInput1"
                      value={getIndividualdata["alternate_contact"]}
                      onChange={handleChange}
                      maxLength={10}
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
                      maxLength={20}
                    />
                  </div>
                  <p style={{ color: "red" }}>{errormsg.alternate_contact}</p>
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
