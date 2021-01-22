import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { Table } from 'reactstrap';

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


function SensorTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  // Render the UI for your table
  return (
    <Table bordered responsive size="sm" {...getTableProps()} >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

function SensorContainer() {
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
        setSensors(data);
      })
      .catch(error => {
        setSensors([]); // reset the [] here - this is optional and is based on expected behaviour
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []); // This is self is componentDidMount

  const columns = React.useMemo(
    () => [
      {
        Header: "fromAccount",
        accessor: "fromAccount" // accessor is the "key" in the data
      },
      {
        Header: "toAccount",
        accessor: "toAccount"
      },
      {
        Header: "Currency",
        accessor: "currency"
      },
      {
        Header: "Amount",
        accessor: "amount"
      },
      {
        Header: "sentAt",
        accessor: "sentAt"
      }
    ],
    []
  );

  if (sensors.length === 0 && !loading) {
    return <div>No Senors data available</div>;
  }

  return (
    <div>
      {loading && <span>Please wait we are fetching data</span>}
      <SensorTable columns={columns} data={sensors} />
    </div>
  );
}

const CurrentBalance = () => {
    return (
      <div>
        <h2>CurrentBalance</h2>
        <SensorContainer />
      </div>
    );
}

export default CurrentBalance;
