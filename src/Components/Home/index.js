import React from 'react';
import { Row, Col } from 'reactstrap';
import CurrentBalance from './CurrentBalance'
import MainExpenses from './MainExpenses'
import TransactionHistory from './TransactionHistory'

const Home = () => {
    return (
      <Row>
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
