
import { useState } from "react";
import { GetCoordinates } from "../helpers/GetCoordinates.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


export const CreatePackage = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [tracking, setTracking] = useState("");
  const [description, setDescription] = useState("");

  const setData = (e) => {
    props.onNewPackage(e);   // sending data to the useState from Map component  
    getCoordinates(e)       // getting coordinates of the input address 
  };


  const getCoordinates = async(e) => {
    let coord = await GetCoordinates(e.address);
    let coordinatesJson = JSON.stringify(coord)

    fetch('http://localhost:3000/api', {         // sending data (coordinates) from front-end to back-end
    method: 'Post',
    body: coordinatesJson
  })
  }


  const onSubmit = (event) => {
    event.preventDefault(); // para que no se haga un refresh del navegador web

    let data = {                // creating a json with the information of the package
      name: name,
      address: address,
      tracking: tracking,
      description: description,
    };

    setName("");        // cleaning input variables
    setAddress("");
    setTracking("");
    setDescription("");

    setData(data);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" onChange={(event) => setName(event.target.value)} value = {name} />

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Address" onChange={(event) => setAddress(event.target.value)} value = {address} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Tracking</Form.Label>
        <Form.Control type="text" placeholder="Tracking Number" onChange={(event) => setTracking(event.target.value)} value = {tracking} />
        <Form.Text className="text-muted">
          Enter a number value please
        </Form.Text>      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" onChange={(event) => setDescription(event.target.value)} value = {description} />
      </Form.Group>

      <Button variant="success" type="submit" onClick={onSubmit}> Submit </Button>{' '}
      <Button variant="secondary" onClick={() =>{props.closeForm(false)}}>Back</Button>

    </Form>
    

  );
};
