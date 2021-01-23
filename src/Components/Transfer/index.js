
import React from 'react';
import { Row, Col } from 'reactstrap';
import { Card,CardBody, CardTitle } from 'reactstrap';
import { useForm } from "react-hook-form";
import { PieChart } from 'react-minimal-pie-chart'
import { useTable } from 'react-table'


const Input = ({ label, register, required }) => (
  <>
    <label>{label}</label>
    <input name={label} ref={register({ required })} />
  </>
);

// you can use React.forwardRef to pass the ref too
const Select = React.forwardRef(({ label }, ref) => (
  <>
    <label>{label}</label>
    <select name={label} ref={ref}>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
  </>
));


const Transfer = () => {
  const transactionHistory = React.useMemo(
    () => [

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
  ]);
  
    

  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    alert(JSON.stringify(transactionHistory));
  };

  const requiredDataFromResponse = transactionHistory;
  console.log(requiredDataFromResponse)
  const datas = requiredDataFromResponse.map(eachSensorItem => (
    {
    fromAccount: eachSensorItem.fromAccount,
    toAccount: eachSensorItem.toAccount,
    sentAt: eachSensorItem.sentAt,
    amount: eachSensorItem.amount.value,
    currency: eachSensorItem.amount.currency,

  }));

    let result = datas.reduce(function (r, a) {
        r[a.fromAccount] = r[a.fromAccount] || [];
        r[a.fromAccount].push(a);
        return r;
    }, Object.create(null));



    return (
      <div>
      <Row className="m-0">
        <Col sm="12" md="4">
          <Card>
            <CardBody>
              <CardTitle className="text-center" tag="h2">Create new transfer</CardTitle>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Select label="Select origin account" ref={register} />
                <br></br>
                <Input  label="Destination account" register={register} required />
                <br></br>

                <Input  label="Amount" register={register} required />
                <input type="submit" />
              </form>
            </CardBody>
          </Card>
        </Col>
        <Col sm="12" md="8">

          {Object.entries(result).map( ([key, value]) => 
            value.map((value) => 
              <div key="value">
                <span>{value.fromAccount} |</span>
                <span>{value.toAccount} |</span>
                <span>{value.sentAt} |</span>
                <span>{value.currency} |</span>
                <span>{value.amount} |</span>
              </div>
          ))}

{Object.keys(result).map(i => result[i] ).map((item,i) => {
  return (
    <table key={item[i].amount}>
      <thead>
      <tr>
          <td>fromAccount</td>
          <td>toAccount</td>
          <td>sentAt</td>
          <td>amount</td>
          <td>currency</td>
      </tr>
      </thead>
      <tbody>

      <tr>
          <td>{item[i].fromAccount}</td>
          <td>{item[i].toAccount}</td>
          <td>{item[i].sentAt}</td>
          <td>{item[i].amount}</td>
          <td>{item[i].currency}</td>
      </tr>
      </tbody>

  </table>
  )
})}
        </Col>
        </Row>
        <Row className="m-0">

        </Row>

      </div>
    );
}

export default Transfer;
