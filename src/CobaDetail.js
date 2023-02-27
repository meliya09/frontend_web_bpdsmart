import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion';

function BasicExample() {
  const [dbo_konten, setCobaDetail] = useState([]);
   
  useEffect(() => {
      getCobaDetail();
  },[]);

  const getCobaDetail = async () => {
      const dbo_konten = await axios.get('http://192.168.100.215:8080/detailtabkonven');
      setCobaDetail(dbo_konten.data);
  }

  const renderAccordion = (details,index) => {
    return (
      <Accordion key={index}>
        <Accordion.Item eventKey={details}>
          <Accordion.Header>Deskripsi</Accordion.Header>
          <Accordion.Body>
            {details.konten_deskripsi}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>Syarat</Accordion.Header>
          <Accordion.Body>
          {details.konten_syarat}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };
 return <div className="CobaDetail">{dbo_konten.map(renderAccordion)}</div>;
}

export default BasicExample;