import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate, useParams } from 'react-router-dom';
import AsyncSelect from "react-select/async";
import swal from 'sweetalert';

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

export default function KreditUpdate() {
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
      .post(`http://192.168.100.215:8080/kredit/update/${id}`, data)
      .then((res) => {
        if (res.status === 200) {
          swal({
            title: "Berhasil",
            text: "Data Berhasil diupdate",
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
    fetch(`http://192.168.100.215:8080/kredit/` + id)
      .then(res => res.json())
      .then(
        (result) => {
          setKontenMenu(result.kredit.konten_menu)
          setKategori(result.kredit.kategori_id)
          setKategoriNama(result.kredit.kategori_nama)

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
                  placeholder={kategori_nama}
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