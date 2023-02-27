import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import swal from 'sweetalert';
import AsyncSelect from "react-select/async";
import InputLabel from "@mui/material/InputLabel";
import Card from 'react-bootstrap/Card';
import { SentimentSatisfiedSharp } from "@material-ui/icons";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function InvestasiUpdate() {
  const classes = useStyles();
  const navigate = useNavigate();
  const axios = require('axios')

  const { id } = useParams();


  const handleChange = (value) => {
    setKategori(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      konten_menu: konten_menu,
      kategori_id: kategoriId.kategori_id,
      kategori_nama: kategoriId.kategori_nama,
    };
    axios
      .post(`http://192.168.100.215:8080/investasi/update/${id}`, data)
      .then((res) => {
        if (res.status === 200) {
          swal({
            title: "Success",
            text: "Users Edited",
            icon: "success",
            showConfirmButton: false,
          });
          navigate(-1);
        }
      });
  };

  const [konten_menu, setKontenMenu] = useState("");
  const [kategoriId, setKategori] = useState("");
  const [kategori_nama, setKategoriNama] = useState("");
  
  

  const fetchData = async () => {
    return await axios
      .get("http://192.168.100.215:8080/kategori")
      .then((result) => {
        const res = result.data;
        return res;
      });
  };

  useEffect(() => {
    fetch(`http://192.168.100.215:8080/investasi/`+id)
    .then(res => res.json())
    .then(
      (result) => {
        setKontenMenu(result.investasi.konten_menu)
        setKategori(result.investasi.kategori_id)
        setKategoriNama(result.investasi.kategori_nama)
       
      }
    )
}, [id])

  return (
    <>
      <Card border="primary" style={{ width: '61rem' }}>
        <Card.Header style={{ fontWeight: 'bold', color: 'blue', fontSize: 20 }} >Update</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Nama Menu
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={konten_menu}
                  onChange={(e) => setKontenMenu(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Tipe Konten
              </Form.Label>
              <Col sm={10}>
                {/* <Form.Control
                  type="text"
                  value={kategori_id}
                  onChange={(e) => setkategoriID(e.target.value)} 
                  /> */}
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                 placeholder= {kategori_nama}
                  loadOptions={fetchData}
                  getOptionLabel={(e) => e.kategori_nama}
                  getOptionValue={(option) => option.kategori_id}
                  onChange={(e) => handleChange(e)}
                 
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button onClick={() => navigate(-1)} variant="danger" size="sm" active>
                  Cancel
                </Button>{' '}
                <Button onClick={handleSubmit} variant="primary" size="sm" active>
                  Submit
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

    </>
  );
};