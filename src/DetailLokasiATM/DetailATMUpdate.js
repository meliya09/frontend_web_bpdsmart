import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import swal from 'sweetalert';
import Card from 'react-bootstrap/Card';
import { SentimentSatisfiedSharp } from "@material-ui/icons";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// import { uid } from "uid";

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


export default function DetailATMUpdate() {
  const classes = useStyles();
  const navigate = useNavigate();
  const axios = require('axios')

  const { id } = useParams();
  const [lokasi_nama, setNama] = useState("");
  const [lokasi_alamat, setAlamat] = useState("");
  const [lokasi_telp, setTelp] = useState("");
  const [lokasi_fax, setFax] = useState("");
  const [lokasi_lat, setLat] = useState("");
  const [lokasi_lon, setLon] = useState("");

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    const response = await axios.get(`http://192.168.100.215:8080/detaillokasiatmbyid/${id}`);
    setNama(response.data.lokasi_nama);
    setAlamat(response.data.lokasi_alamat);
    setTelp(response.data.lokasi_telp);
    setFax(response.data.lokasi_fax);
    setLat(response.data.lokasi_lat);
    setLon(response.data.lokasi_lon);
  };


  const updateDetail = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("lokasi_nama", lokasi_nama);
    formData.append("lokasi_alamat", lokasi_alamat);
    formData.append("lokasi_telp", lokasi_telp);
    formData.append("lokasi_fax", lokasi_fax);
    formData.append("lokasi_lat", lokasi_lat);
    formData.append("lokasi_lon", lokasi_lon);
    try {
      await axios.post(`http://192.168.100.215:8080/detaillokasiatm/update/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
        .then(res => {
          swal({
            title: "Berhasil!",
            text: "Data Berhasil diupdate",
            icon: "success",
            timer: 2000,
            button: false,
          })
          navigate(-1);
        })
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Card border="primary" style={{ width: '61rem' }}>
        <Card.Header style={{ fontWeight: 'bold', color: 'blue', fontSize: 20 }} >Update</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Lokasi
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={lokasi_nama}
                  onChange={(e) => setNama(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Alamat
              </Form.Label>
              <Col sm={10}>
                <Form.Control as="textarea" rows={3}
                  type="text"
                  value={lokasi_alamat}
                  onChange={(e) => setAlamat(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Telp
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={lokasi_telp}
                  onChange={(e) => setTelp(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Fax
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={lokasi_fax}
                  onChange={(e) => setFax(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Lat
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={lokasi_lat}
                  onChange={(e) => setLat(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Lon
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={lokasi_lon}
                  onChange={(e) => setLon(e.target.value)} />
              </Col>
            </Form.Group>


            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button onClick={() => navigate(-1)} variant="danger" size="sm" active>
                  Cancel
                </Button>{' '}
                <Button  onClick={updateDetail} variant="primary" size="sm" active>
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
