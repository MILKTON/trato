import React, { useState, useEffect } from "react";
import { PieChart } from 'react-minimal-pie-chart';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle
} from 'reactstrap';
const API_DATA_RETURNED = [
  {
    "fromAccount":123456789,
    "toAccount":192837465,
    "amount":{
       "currency":"€",
       "value":876.88
    },
    "sentAt":"2012-04-23T18:25:43.511Z"
  },
  {
    "fromAccount":123456789,
    "toAccount":192837465,
    "amount":{
       "currency":"€",
       "value":654.88
    },
    "sentAt":"2012-04-21T18:25:43.511Z"
 },
 {
    "fromAccount":987654321,
    "toAccount":543216789,
    "amount":{
       "currency":"$",
       "value":543
    },
    "sentAt":"2012-04-23T18:25:43.511Z"
 },
 {
    "fromAccount":987654321,
    "toAccount":543216789,
    "amount":{
       "currency":"$",
       "value":987.54
    },
    "sentAt":"2012-04-23T18:25:43.511Z"
 } 
];



// This is custom mock axios
const axios = () => {
  return new Promise(res => {
    setTimeout(() => {
      return res({ data: API_DATA_RETURNED });
    }, 3000);
  });
};



function TransactionHistory() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // GET sensor list from API
    axios()
      .then(response => {
        const requiredDataFromResponse = response.data;
        const data = requiredDataFromResponse.map(eachSensorItem => (
          {
          fromAccount: eachSensorItem.fromAccount,
          toAccount: eachSensorItem.toAccount,
          sentAt: eachSensorItem.sentAt,
          amount: eachSensorItem.amount.value,
          currency: eachSensorItem.amount.currency,

        }));

      let holder = {};
      
      data.forEach(d => {
        if (holder.hasOwnProperty(d.toAccount)) {
          holder[d.toAccount] = holder[d.toAccount] + d.amount;
        } else {
          holder[d.toAccount] = d.amount;
        }
      });
      
      let obj2 = [];
      let colors =['#E38627','#C13C37','#6A2135']
      let i =0
      for (var prop in holder) {
        obj2.push({ title: prop, value: holder[prop], color:colors[i]});
        i++
        //{ title: 'One', value: 10, color: '#E38627' },
      }
        setSensors(obj2);
      })
      .catch(error => {
        setSensors([]); // reset the [] here - this is optional and is based on expected behaviour
      })
      .finally(() => setLoading(false));
  }, []); // This is self is componentDidMount


  return (
    <Card className="text-justify"> 
    <CardBody>
    <PieChart data={sensors}  
                label={({ dataEntry }) => ("Account:"+dataEntry.title+"Total: "+dataEntry.value)}
                labelStyle={(index) => ({
                  fontSize: '4px',
                })}
                />
      <CardTitle tag="h2">Transaction History</CardTitle>
      <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris suscipit in sapien eu pretium. Pellentesque fermentum varius risus, a commodo ipsum fermentum a. Nam sed hendrerit mi, non dignissim diam. Nullam at erat cursus, egestas tellus eu, facilisis sem. In hac habitasse platea dictumst. In a luctus lacus. Nam rutrum ligula quis diam sodales molestie. Integer vel commodo lacus. Fusce quis accumsan justo. Etiam est erat, auctor ut ornare quis, pharetra eget lectus. Aliquam vel elit sit amet nibh placerat vehicula. Integer consequat ligula ut consequat viverra.</CardText>
    </CardBody>
    </Card>
  );

}

export default TransactionHistory;
