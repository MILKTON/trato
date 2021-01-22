
import React from 'react';
import { Row, Col } from 'reactstrap';
import { Card,CardBody, CardTitle } from 'reactstrap';
import { useForm } from "react-hook-form";
import { PieChart } from 'react-minimal-pie-chart'
import { useTable } from 'react-table'

const transactionHistory = [
  {
    "transactions":[
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
    ]
 }
];

const columns = [
    {
      Header: 'fromAccount 1',
      accessor: 'fromAccount', // accessor is the "key" in the data
    },
    {
      Header: 'toAccount 2',
      accessor: 'toAccount',
    },
  ]

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

  const data2 = React.useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
    ],
    []
  )

  const data = React.useMemo(
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
  
    

  const columns = React.useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'fromAccount', // accessor is the "key" in the data
      },
      {
        Header: 'Column 2',
        accessor: 'toAccount',
      },
    ],
    []
  )

  const { register, handleSubmit } = useForm();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  console.log(data)
  console.log(data2)
  const onSubmit = data => {
    alert(JSON.stringify(data));
  };

    return (
      <div>
        <Row>
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
   
        </Col>
        </Row>
        <Row>
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
        </Row>

      </div>
    );
}

export default Transfer;
