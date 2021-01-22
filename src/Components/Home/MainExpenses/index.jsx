import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle
} from 'reactstrap';

import media from '../../..//media/320x200.png'; // Tell webpack this JS file uses this image


const MainExpenses = () => {
    return (
      <div className="text-justify">
        <Card>
          <CardImg top width="100%" src={media} alt="Card image cap" />
          <CardBody>
            <CardTitle tag="h2">Main Expenses</CardTitle>
            <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris suscipit in sapien eu pretium. Pellentesque fermentum varius risus, a commodo ipsum fermentum a. Nam sed hendrerit mi, non dignissim diam. Nullam at erat cursus, egestas tellus eu, facilisis sem. In hac habitasse platea dictumst. In a luctus lacus. Nam rutrum ligula quis diam sodales molestie. Integer vel commodo lacus. Fusce quis accumsan justo. Etiam est erat, auctor ut ornare quis, pharetra eget lectus. Aliquam vel elit sit amet nibh placerat vehicula. Integer consequat ligula ut consequat viverra.</CardText>
          </CardBody>
        </Card>
      </div>
    );
}

export default MainExpenses;
