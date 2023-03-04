import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import socketIO from "socket.io-client"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import VerticalNav from "../../components/Admin/VerticalNav";

const AdminAnalyticsPage = () => {
   const [startDate,setStartDate] = useState(new Date().toISOString().substring(0,10))
   let previousDay = new Date()
   previousDay.setDate(previousDay.getDate()-1)
   const [endDate,setEndDate] = useState(new Date(previousDay).toISOString().substring(0,10))
   const [DataForFirstDate,setDataForFirstDate] = useState([])
   const [DataForSecondDate,setDataForSecondDate] = useState([])

   const DataForDate = async(DateInput)=>{
      const {data} = await axios.get("/api/orders/getOrdersForAnalysis",{params : { date : DateInput}})
      return data
   }

   useEffect(()=>{
        DataForDate(startDate).then((res)=>{
          let orderSum = 0
          const Orders = res.map((order)=>{
            orderSum += order.orderTotal.cartSubtotal 
            var date = new Date(order.createdAt).toLocaleString("en-IN", {
              hour: "numeric",
              hour12: true,
              timeZone: "UTC",
            });
            return { name: date, [startDate]: orderSum };
          })
          setDataForFirstDate(Orders) 
        })
         
        DataForDate(endDate).then((res)=>{
          let orderSum = 0
          const Orders = res.map((order)=>{
            orderSum += order.orderTotal.cartSubtotal 
            var date = new Date(order.createdAt).toLocaleString("en-IN", {
              hour: "numeric",
              hour12: true,
              timeZone: "UTC",
            });
            return { name: date, [endDate]: orderSum };
          })
          setDataForSecondDate(Orders) 
        })
   },[startDate,endDate])

   useEffect(()=>{
    const socket = socketIO()
    let today = new Date().toDateString();
      const handler = (newOrder) => {
          var orderDate = new Date(newOrder.createdAt).toLocaleString("en-IN", { hour: "numeric", hour12: true, timeZone: "UTC" });
          if (new Date(newOrder.createdAt).toDateString() === today) {
              if (today === new Date(startDate).toDateString()) {
                  setDataForFirstDate((prev) => {
                      if (prev.length === 0) {
                         return [{ name: orderDate, [startDate]: newOrder.orderTotal.cartSubtotal }]; 
                      }
                      const length = prev.length;
                      if (prev[length - 1].name === orderDate) {
                          prev[length - 1][startDate] += newOrder.orderTotal.cartSubtotal;
                          return [...prev];
                      } else {
                        var lastElem = { name: orderDate, [startDate]: prev[length - 1][startDate] + newOrder.orderTotal.cartSubtotal }; 
                        return [...prev, lastElem];
                      }
                  })
              }
              else if (today === new Date(endDate).toDateString()) {
                  setDataForSecondDate((prev) => {
                      if (prev.length === 0) {
                          return [{ name: orderDate, [endDate]: newOrder.orderTotal.cartSubtotal }];
                      }
                      const length = prev.length;
                      if (prev[length - 1].name === orderDate) {
                         prev[length - 1][endDate] += newOrder.orderTotal.cartSubtotal; 
                         return [...prev];
                      } else {
                          var lastElem = { name: orderDate, [endDate]: prev[length - 1][endDate] + newOrder.orderTotal.cartSubtotal };
                          return [...prev, lastElem];
                      }
                  })
              }
          }
      }
      socket.on("newOrder", handler);
      return () => socket.off("newOrder", handler);
   },[startDate,endDate,DataForFirstDate,DataForSecondDate])




  return (
  <Row className="m-5">
  <Col md={2}>
    <VerticalNav />
  </Col>
  <Col md={10}>
    <h1>
      Black Friday Cumulative Revenue {startDate} VS{" "}
      {endDate}
    </h1>
    <Form.Group controlId="firstDateToCompare">
      <Form.Label>Select First Date To Compare</Form.Label>
      <Form.Control
        onChange={(e)=>setStartDate(e.target.value)}
        type="date"
        name="startDate"
        placeholder="First Date To Compare"
        defaultValue={startDate}
      />
    </Form.Group>
    <br />
    <Form.Group controlId="secondDateToCompare">
      <Form.Label>Select Second Date To Compare</Form.Label>
      <Form.Control
        onChange={(e)=>setEndDate(e.target.value)}
        type="date"
        name="endDate"
        placeholder="Second Date To Compare"
        defaultValue={endDate}
      />
    </Form.Group>
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          label={{
            value: "TIME",
            offset: 50,
            position: "insideBottomRight",
          }}
          allowDuplicatedCategory={false}
        />
        <YAxis
          label={{ value: "REVENUE Rs", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        {DataForFirstDate.length > DataForSecondDate.length ? (
          <>
            <Line
            data={DataForFirstDate}
              type="monotone"
              dataKey={startDate} 
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              strokeWidth={4}
            />
            <Line
            data={DataForSecondDate}
              type="monotone"
              dataKey={endDate} 
              stroke="#82ca9d"
              strokeWidth={4}
            />
          </>
        ) : (
          <>
            <Line
            data={DataForSecondDate}
              type="monotone"
              dataKey={endDate}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              strokeWidth={4}
            />
            <Line
            data={DataForFirstDate}
              type="monotone"
              dataKey={startDate}
              stroke="#82ca9d"
              strokeWidth={4}
            />
          </>
        )}
      </LineChart>
    </ResponsiveContainer>
  </Col>
</Row>
  );
};

export default AdminAnalyticsPage;
