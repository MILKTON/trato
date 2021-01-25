import React from "react";
import { Row, Col } from "reactstrap";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useForm } from "react-hook-form";
import { Table } from "reactstrap";

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
  const transactionHistory = React.useMemo(() => [
    {
      fromAccount: 123456789,
      toAccount: 192837465,
      amount: {
        currency: "€",
        value: 876.88,
      },
      sentAt: "2012-04-23T18:25:43.511Z",
    },
    {
      fromAccount: 123456789,
      toAccount: 192837465,
      amount: {
        currency: "€",
        value: 654.88,
      },
      sentAt: "2012-04-21T18:25:43.511Z",
    },
    {
      fromAccount: 987654321,
      toAccount: 543216789,
      amount: {
        currency: "$",
        value: 543,
      },
      sentAt: "2012-04-23T18:25:43.511Z",
    },
    {
      fromAccount: 987654321,
      toAccount: 543216789,
      amount: {
        currency: "$",
        value: 987.54,
      },
      sentAt: "2012-04-23T18:25:43.511Z",
    },
  ]);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(transactionHistory));
  };

  const requiredDataFromResponse = transactionHistory;
  const datas = requiredDataFromResponse.map((eachSensorItem) => ({
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
              <CardTitle className="text-center" tag="h2">
                Create new transfer
              </CardTitle>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Select label="Select origin account" ref={register} />
                <br></br>
                <Input
                  label="Destination account"
                  register={register}
                  required
                />
                <br></br>

                <Input label="Amount" register={register} required />
                <input type="submit" />
              </form>
            </CardBody>
          </Card>
        </Col>
        <Col sm="12" md="8">
        </Col>
        <Col sm="12" md="12">
          {Object.entries(result).map(([key, value]) => {
            return (
              <div key={key}>
                <Table bordered size="sm">
                  <thead>
                    <tr>
                      <th>fromAccount</th>
                      <th>toAccount</th>
                      <th>sentAt</th>
                      <th>currency</th>
                      <th>amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {value.map((val, index) => {
                      return (
                        <tr key={index}>
                          <td key="1">{value[index].fromAccount}</td>
                          <td key="2">{value[index].toAccount}</td>
                          <td key="3">{value[index].sentAt}</td>
                          <td key="4">{value[index].currency}</td>
                          <td key="5">{value[index].amount}</td>
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
