import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { Table } from "reactstrap";
import { Card, CardBody, CardTitle } from "reactstrap";

const API_DATA_RETURNED = [
  {
    "account":123456789,
    "balance":{
       "currency":"€",
       "value":765095.54
    },
    "owner":7612333392,
    "createdAt":"2012-04-23T18:25:43.511Z"
 },
 {
    "account":987654321,
    "balance":{
       "currency":"$",
       "value":524323.54
    },
    "owner":7612333392,
    "createdAt":"2012-04-23T18:25:43.511Z"
 }
];

const axios = () => {
  return new Promise(res => {
    setTimeout(() => {
      return res({ data: API_DATA_RETURNED });
    }, 3000);
  });
};

function dateFormat(date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const d = new Date(date)
  const dayIndex = d.getDate()
  const year = d.getFullYear()
  const monthName = months[d.getMonth()]
  return dayIndex+"/"+monthName+"/"+year
}
function SensorTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });
  return (
    <Table bordered responsive size="sm" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

function BalanceContainer() {
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios()
      .then(response => {
        const requiredDataFromResponse = response.data;
        const data = requiredDataFromResponse.map(e => (
        {
          account: e.account,
          balance: e.balance.value,
          currency: e.balance.currency,
          value: e.balance.value,
          createdAt: dateFormat(e.createdAt),
          owner: e.owner
        }
        ));
        setBalance(data);
      })
      .catch(error => {
        setBalance([]);
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Account No.",
        accessor: "account"
      },
      {
        Header: "Balance",
        accessor: "balance"
      },
      {
        Header: "Date of latest transfer",
        accessor: "createdAt"
      }
    ],
    []
  );

  if (balance.length === 0 && !loading) {
    return <div>No data available</div>;
  }

  return (
    <div>
      {loading && <span>Please wait we are fetching data</span>}
      <SensorTable columns={columns} data={balance} />
    </div>
  );
}

const CurrentBalance = () => {
  return (
    <Card className="text-justify">
      <CardBody>
      <CardTitle tag="h2">Current Balance</CardTitle>
        <BalanceContainer />
      </CardBody>
    </Card>
  );
};

export default CurrentBalance;
