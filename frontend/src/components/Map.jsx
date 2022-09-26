import { useState } from "react";
import GoogleMaps from "simple-react-google-maps";
import { CreatePackage } from "./CreatePackage.jsx";
import { PackItem } from "./PackItem.jsx";
import Button from "react-bootstrap/Button";
import "../styles.css";

export const Map = () => {
  //TODO tratar de pasar esto al helpers enviando la funcion del useState
  const [coordinates, setCoordinates] = useState([]);
  const [isMap, setIsMap] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [isCard, setIsCard] = useState(true);
  const [packages, setPackages] = useState([]);
  const [goMap, setGoMap] = useState(true);



  const onAddPackage = (newPackage) => {
    setPackages([newPackage, ...packages]);
  };


  const getCoordinates = async (address) => {
      
    fetch('http://localhost:3000/api').then(x => x.json()).then(coord => setCoordinates(...coordinates, coord)) // request coordinates from backend
    
  };


  const deliver = () => {   // funcion for render the map
    getCoordinates();
    setIsForm(false);
    setIsCard(false);
    setIsMap(true);
    setGoMap(false);
  };

  const backToHome = () => {   // funcion for render the home
    setIsForm(false);
    setIsCard(true);
    setIsMap(false);
    setGoMap(true);
  };

  const goAddPack = () => { // funcion for render the Form
    setIsForm(true);
    setIsCard(false);
    setIsMap(false);

  };

  return (
    <>
      <header className="site-header">
        <h3 className="texto"> Oktara Logistic Company </h3>
        <Button
          variant="outline-light"
          size="sm"
          onClick={goMap ? deliver : backToHome}
        >
          {goMap ? "Deliver" : "Back"}
        </Button>
      </header>
      {!isForm & !isMap ? (
        <header>
        <Button className="buttonAdd" variant="outline-dark" onClick={goAddPack}>
          Add Package
        </Button>
      </header>
      ) : null}
      <div>  
        {isMap ? (                        // if map is true -> render the map
          <div>
            <GoogleMaps
              apiKey={"AIzaSyDcLshpLOkpm90p8qbjanpQqshHHRon3Ho"}
              style={{ height: "700px", width: "1345px" }}
              zoom={8}
              center={{
                lat: 9.748917,
                lng: -83.753428,
              }}
              markers={coordinates}
            />
          </div>
        ) : isForm ? (                    // if Form is true -> render the Form
          <div className="space">
            <CreatePackage onNewPackage={onAddPackage} closeForm={setIsForm} />
          </div>
        ) : (                            // if home is true -> render the card grid with package information
          <div className="card-grid">
            {packages?.map((pack) => (
              <PackItem
                key={pack.tracking}
                {...pack} //all object
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
