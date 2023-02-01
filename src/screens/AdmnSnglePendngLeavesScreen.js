
import React,{useEffect} from 'react';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {useNavigate} from "react-router-dom"
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { getIndividualPendingLeaves } from '../actions/adminActions'
import Header from "../components/Header";
import Loader from '../components/Loader';
import Message from '../components/Message'

function AdmnSnglePendngLeavesScreen() {
    
    const { employeeId } = useParams();
    const dispatch = useDispatch();
    const leavesForApproval = useSelector((state) => state.individualPendingLeaves)
    const {error,loading,individualPendingLeave} = leavesForApproval
    const navigate = useNavigate();
    useEffect(() => {
        const userData = localStorage.getItem('userInfo')
        if(!userData){
            navigate('/')
        }
        dispatch(getIndividualPendingLeaves(employeeId))
        
    },[navigate])
    
    return (
        <>
        <Header/>
        <MDBTable align='middle' className="mt-4">
      <MDBTableHead light>
        <tr>
          <th scope='col'>Date Of Leave Applied</th>
          <th scope='col'>Leave Notes</th>
          <th scope='col'>No Of Leaves Required</th>
          <th scope='col'>Status</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {loading ? <Loader/> : 
        error ? <Message variant="danger">Something's Wrong Contact Admin</Message> :
        individualPendingLeave ? individualPendingLeave.map((each) => (
            <tr>
            <td>{each.leave_applied}</td>
            <td>{each.leave_notes}</td>
            <td>{each.no_of_leaves}</td>
            <td>
              <MDBBtn color="success" size='sm'>
                Approve
              </MDBBtn>
            </td>
          </tr>
        )):null}
      </MDBTableBody>
    </MDBTable>
    </>
    )
}

export default AdmnSnglePendngLeavesScreen
