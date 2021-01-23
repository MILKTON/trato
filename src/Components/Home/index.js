import React from 'react';
import { Row, Col } from 'reactstrap';
import CurrentBalance from './CurrentBalance'
import MainExpenses from './MainExpenses'
import TransactionHistory from './TransactionHistory'
import { useHistory } from 'react-router-dom';

const Home = () => {
    //const history = useHistory();
    //console.log(history.location.state.name)
    return (
      <Row className="m-0">
        <Col sm="12" md="4">
          <TransactionHistory/>
        </Col>
        <Col sm="12" md="4">
          <MainExpenses/>
        </Col>
        <Col sm="12" md="4">
          <CurrentBalance/>
        </Col>
      </Row>
    );
}

export default Home;
