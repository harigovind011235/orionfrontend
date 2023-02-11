import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { adminIndividualEditLeaves, getIndividualEditLeaves } from "../actions/adminActions";
import Header from "../components/Header";
import { Container, Row, Col, Table } from "react-bootstrap";
import Message from '../components/Message'
import Loader from '../components/Loader'


function AdminEditLeaves() {
    const { employeeId } = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputvalue, setInputvalue] = useState({})
    const [color, setColor] = useState(false)


    const employeesEditLeaves = useSelector(
        (state) => state.getIndividualEditLeaves
    );

    const { error, loading, individualEditLeave } = employeesEditLeaves;

    const handleInputChange = (e) => {
        setColor(true)
        setInputvalue({ ...inputvalue, [e.target.name]: parseInt(e.target.value) })
    }

    const handleSave = () => {
        let data = []
        data.push({ no_of_leaves: inputvalue.casual_leave && inputvalue.casual_leave, leave_type: 1 }, { no_of_leaves: inputvalue.sick_leave && inputvalue.sick_leave, leave_type: 2 }, { no_of_leaves: inputvalue.emergency_leave && inputvalue.emergency_leave, leave_type: 3 },
            { no_of_leaves: inputvalue.comp_off && inputvalue.comp_off, leave_type: 4 }, { no_of_leaves: inputvalue.optional_holidays && inputvalue.optional_holidays, leave_type: 5 })
        dispatch(adminIndividualEditLeaves(employeeId, data))
        window.location.reload()
    }

    useEffect(() => {
        setInputvalue(individualEditLeave)
    }, [individualEditLeave])

    useEffect(() => {
        const userData = localStorage.getItem("userInfo");
        if (!userData) {
            navigate("/");
        }
        dispatch(getIndividualEditLeaves(employeeId));
    }, [navigate]);

    return (
        <>
            <Header />
            <Container className="mt-4">
                {error && <Message>Something's Broke But You Are Lucky Its Not Your Heart So We Can Fix It</Message>}
                {loading && <Loader />}
                <Row
                    md={6}
                    className="justify-content-lg-center justify-content-md-center"
                >
                    <Col lg="4" md="3" className="offset-lg-1">
                        <h2>Remaining Leaves</h2>
                    </Col>
                </Row>
                <Row
                    md={6}
                    lg={6}
                    className="justify-content-lg-center justify-content-md-center mt-4"
                >
                    <Col lg="12" md="12">
                        <Table>
                            <thead class="table-dark">
                                <tr>
                                    <th>Type Of Leave</th>
                                    <th>Leaves Left</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class={inputvalue.casual_leave >= 1 ? (inputvalue.casual_leave === 1 ? "table-warning" : "table-success") : inputvalue.casual_leave <= 0 || color ? "table-danger" : ""}>
                                    <td>Casual Leave</td>
                                    <td><input type="number" name="casual_leave" value={inputvalue.casual_leave} onChange={handleInputChange} /></td>
                                </tr>
                                <tr class={inputvalue.sick_leave >= 1 ? (inputvalue.sick_leave === 1 ? "table-warning" : "table-success") : inputvalue.sick_leave <= 0 || color ? "table-danger" : ""}>
                                    <td>Sick Leave</td>
                                    <td><input type="number" name="sick_leave" value={inputvalue.sick_leave} onChange={handleInputChange} /></td>
                                </tr>
                                <tr class={inputvalue.emergency_leave >= 1 ? (inputvalue.emergency_leave === 1 ? "table-warning" : "table-success") : inputvalue.emergency_leave <= 0 || color ? "table-danger" : ""}>
                                    <td>Emergency Leave</td>
                                    <td><input type="number" name="emergency_leave" value={inputvalue.emergency_leave} onChange={handleInputChange} /></td>
                                </tr>
                                <tr class={inputvalue.comp_off >= 1 ? (inputvalue.comp_off === 1 ? "table-warning" : "table-success") : inputvalue.comp_off <= 0 || color ? "table-danger" : ""}>
                                    <td>Compensation Off</td>
                                    <td><input type="number" name="comp_off" value={inputvalue.comp_off} onChange={handleInputChange} /></td>
                                </tr>
                                <tr class={inputvalue.optional_holidays >= 1 ? (inputvalue.optional_holidays === 1 ? "table-warning" : "table-success") : inputvalue.optional_holidays <= 0 || color ? "table-danger" : ""}>
                                    <td>Optional Holidays</td>
                                    <td><input type="number" name="optional_holidays" value={inputvalue.optional_holidays} onChange={handleInputChange} /></td>
                                </tr>
                            </tbody>
                        </Table>
                        <br />
                        <button
                            type="submit"
                            className="rounded-pill"
                            onClick={handleSave}
                            style={{
                                background: "#232E48",
                                width: "100px",
                                height: "40px",
                                color: "white",
                                fontSize: "11px",
                                marginLeft: "600px"
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16">
                                <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                            </svg>&nbsp;
                            <b>SAVE</b>
                        </button>
                    </Col>
                </Row>
            </Container>
        </>

    )
}
export default AdminEditLeaves