import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import  {useState} from "react";

import Card from "react-bootstrap/Card";

export const PackItem = ({ name, address, tracking, description }) => {
 
  const [pending, setPending] = useState(true);


  const pendingFalse = () => {
    setPending(false);

  }
  const pendingTrue = () => {
    setPending(true);

  }

  return (
    <div className="grid">
      <Card border="dark" style={{ width: "18rem" }} key={tracking} bg="light">
        {/* <Card.Img variant="top" src={imagen} /> */}
        <Card.Body>
          <Card.Header className="card-titles">{name} </Card.Header>
          <Card.Text>Address: {address}</Card.Text>
          <Card.Text>Tracking number: {tracking}</Card.Text>
          <Card.Text>Description: {description}</Card.Text>

          <DropdownButton size="sm" id="dropdown-basic-button" title={pending ? 'Pending' : 'Delivered'} variant={pending ? 'danger' : 'success'}>
            <Dropdown.Item as="button" onClick={pendingTrue}>Pending</Dropdown.Item>
            <Dropdown.Item as="button" onClick={pendingFalse}>Delivered</Dropdown.Item>
          </DropdownButton>
        </Card.Body>
      </Card>
    </div>
  );
};
