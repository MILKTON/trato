import React, {useContext} from 'react';
import { Row, Col } from 'reactstrap';
import CurrentBalance from './CurrentBalance'
import MainExpenses from './MainExpenses'
import TransactionHistory from './TransactionHistory'
import { UserContext } from "../../userContext";
import { UncontrolledAlert } from 'reactstrap';

const Home = () => {
    const { user } = useContext(UserContext);
    return (
      <>
        <Row>
          <Col sm="12" md="12">
          <UncontrolledAlert color="info" className="justify-content-center">
           <h2 className="text-center">Welcome to your online banking {user}</h2>
          </UncontrolledAlert>
          </Col>
        </Row>
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
      </>
    );
}

export default Home;
