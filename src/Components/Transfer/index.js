import React, {useState} from "react";
import { Row, Col } from "reactstrap";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useForm } from "react-hook-form";
import { Table, FormGroup, Button } from "reactstrap";

const Input = ({ label, register, id}) => (
  <>
    <label htmlFor={label}>{label}</label>
    <input className="form-control" name={id} required ref={register({
                      maxLength: {
                        value: 9
                      }
    })} />
  </>
);

const Select = React.forwardRef(({ label, id }, ref) => (
  <>
    <label htmlFor={id}>{label}</label>
    <select className="form-control" name={id} ref={ref}>
      <option value="123456789">123456789</option>
      <option value="987654321">987654321</option>
    </select>
  </>
));

const Transfer = () => {
  const transactionHistory = [
    {
      fromAccount: 123456789,
      toAccount: 192837465,
      amount: {
        currency: "€",
        value: 876.88
      },
      sentAt: "2012-04-23T18:25:43.511Z"
    },
    {
      fromAccount: 123456789,
      toAccount: 192837465,
      amount: {
        currency: "€",
        value: 654.88
      },
      sentAt: "2012-04-21T18:2  :43.511Z"
    },
    {
      fromAccount: 987654321,
      toAccount: 543216789,
      amount: {
        currency: "$",
        value: 543
      },
      sentAt: "2012-04-23T18:25:43.511Z"
    },
    {
      fromAccount: 987654321,
      toAccount: 543216789,
      amount: {
        currency: "$",
        value: 987.54
      },
      sentAt: "2012-04-23T18:25:43.511Z"
    }
  ];

  const { register, handleSubmit} = useForm();

  const onSubmit = (payload, e) =>  {
    alert(JSON.stringify(payload));
    e.target.reset();
    result[payload.fromAccount].push({fromAccount: payload.fromAccount, toAccount: payload.toAccount, sentAt: new Date().toISOString(), amount: payload.amount, currency: "€"});
  };


  const requiredDataFromResponse = transactionHistory;
  const data = requiredDataFromResponse.map(eachSensorItem => ({
    fromAccount: eachSensorItem.fromAccount,
    toAccount: eachSensorItem.toAccount,
    sentAt: eachSensorItem.sentAt,
    amount: eachSensorItem.amount.value,
    currency: eachSensorItem.amount.currency
  }));

  const [result, setResult] = useState(() => {
    let result = data.reduce(function (r, a) {
      r[a.fromAccount] = r[a.fromAccount] || [];
      r[a.fromAccount].push(a);
      return r;
    }, Object.create(null));
    return result;
  });
  

  return (
    <div>
      <Row className="m-0">
        <Col sm="12" md="4">
          <Card>
            <CardBody>
              <CardTitle className="text-center" tag="h2">
                Create new transfer
              </CardTitle>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup className="formGroup">
                  <Select label="Select origin account" id="fromAccount" ref={register} />
                </FormGroup>

                <FormGroup>
                  <Input
                    label="Destination account"
                    name="destination"
                    id="toAccount"
                    register={register}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Input label="Amount" id="amount" register={register} required />
                </FormGroup>

                <Button className="float-right" style={{marginLeft:"5px"}} outline color="secondary" type="reset">Cancel</Button>
                <Button className="float-right" color="primary">Transfer</Button>{' '}
              </form>
            </CardBody>
          </Card>
        </Col>
        <Col sm="12" md="8"></Col>
        <Col sm="12" md="12">
          {Object.entries(result).map(([key, value]) => {
            return (
              <div key={key}>
                <Table bordered size="sm">
                  <thead>
                    <tr>
                      <th>Origin account</th>
                      <th>Destination account</th>
                      <th>Transfer date</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {value.map((val, index) => {
                      return (
                        <tr key={index}>
                          <td>{value[index].fromAccount}</td>
                          <td>{value[index].toAccount}</td>
                          <td>{value[index].sentAt}</td>
                          <td>{value[index].currency+""+value[index].amount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            );
          })}
        </Col>
      </Row>
    </div>
  );
};

export default Transfer;
