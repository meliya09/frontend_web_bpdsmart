import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import JoditEditor from 'jodit-react';
import React, { useEffect, useRef, useState } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate, useParams } from 'react-router-dom';
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


export default function FormUpdate() {
  const classes = useStyles();
  const navigate = useNavigate();
  const axios = require('axios')

  const { id } = useParams();
  const [konten_judul, setJudul] = useState("");
  const [konten_gambar, setGambar] = useState("");
  const [file_path, setPreview] = useState("");
  const [konten_deskripsi, setDeskripsi] = useState("");
  const editor = useRef(null);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    const response = await axios.get(`http://192.168.100.215:8080/detailinternalbyid/${id}`);
    setJudul(response.data.konten_judul);
    setGambar(response.data.konten_gambar);
    setPreview(response.data.file_path);
    setDeskripsi(response.data.konten_deskripsi);
  };

  const loadGambar = (e) => {
    const konten_gambar = e.target.files[0];
    setGambar(konten_gambar);
    setPreview(URL.createObjectURL(konten_gambar));
  };

  const updateDetail = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("konten_judul", konten_judul);
    formData.append("konten_gambar", konten_gambar);
    formData.append("konten_deskripsi", konten_deskripsi);
    try {
      await axios.post(`http://192.168.100.215:8080/detailinternal/update/${id}`, formData, {
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
                Judul Berita
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={konten_judul}
                  onChange={(e) => setJudul(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Gambar
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="file"
                  onChange={loadGambar} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}></Form.Label>
              <Col sm={10}>
                {file_path ? (
                  <Figure>
                    <Figure.Image
                      width={171}
                      height={180}
                      alt="Preview Image"
                      src={file_path}
                    />
                  </Figure>
                ) : (
                  ""
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Deskripsi
              </Form.Label>
              <Col sm={10}>
                <JoditEditor
                  ref={editor}
                  value={konten_deskripsi}
                  onChange={newContent => setDeskripsi(newContent)}
                  style={{ backgroundColor: '#c8e6c9' }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button onClick={() => navigate(-1)} variant="danger" size="sm" active>
                  Cancel
                </Button>{' '}
                <Button onClick={updateDetail} variant="primary" size="sm" active>
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
