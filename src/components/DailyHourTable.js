import React,{useState,useEffect} from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch,useSelector } from 'react-redux'
import { listDailyHours } from '../actions/employeeActions'
import Message from "./Message";
import Loader from "./Loader";

function DailyHourTable() {
  
  let [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [dailyhoursarray,setDailyhourArray] = useState([])
  const dispatch = useDispatch()
  const DailyHours = useSelector((state) => state.employeeDailyHour)
  const {error,loading,employeedailyhours} = DailyHours
  const employeeDailyHour = employeedailyhours && employeedailyhours['results'] ? employeedailyhours['results'] : null
  const totalDailyHourCount = employeedailyhours && employeedailyhours['count'] ? employeedailyhours["count"] : null

  if (employeeDailyHour && totalDailyHourCount && dailyhoursarray.length < totalDailyHourCount){
    dailyhoursarray.push(...employeeDailyHour)
  }

  useEffect(() => {
    setDailyhourArray([])
    dispatch(listDailyHours(page))
    var next_page = employeedailyhours['next']
    if (!next_page){
      setHasMore(false);
    }
  },[dispatch])

  const fetchData = () => {
    var next_page = employeedailyhours['next']
    if (!next_page){
      setHasMore(false);
    }
    else{
      setPage(page + 1);
      const current_page = next_page ? page + 1 : null
      dispatch(listDailyHours(current_page));
    }
  };
  
  return (
    <Container className="p-2 mt-4">
      <Row md={6} lg={6} className="mt-4">
        <Col lg={12} md={12}>
        <InfiniteScroll
      dataLength={dailyhoursarray && dailyhoursarray.length > totalDailyHourCount ? dailyhoursarray.length : null}
      next={fetchData}
      hasMore={hasMore}
      loader={<Loader/>}
      endMessage={
        <p style={{textAlign: 'center'}}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>CheckIn</th>
                <th>CheckOut</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
            {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant="danger">
                    Something Wrong Admin To The Rescue
                  </Message>
                ) : dailyhoursarray ? (
                  dailyhoursarray.map((each) => (
                    <tr key={each.id}>
                      <td>{each.date_of_checkin}</td>
                      <td>{each.checkin}</td>
                      <td>{each.checkout}</td>
                      <td>{each.hours_perday}</td>
                    </tr>
                  ))
                ) : (
                  <Message variant="danger">
                    Something Wrong Admin To The Rescue
                  </Message>
                )}
            </tbody>
          </Table>
          </InfiniteScroll>
        </Col>
      </Row>
    </Container>
  );
}

export default DailyHourTable;
