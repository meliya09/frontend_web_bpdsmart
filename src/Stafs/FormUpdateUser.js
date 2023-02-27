import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from "react";
// import Button from '@material-ui/core/Button'; 
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import AsyncSelect from "react-select/async";
import swal from 'sweetalert';

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


export default function FormUpdateUser() {
  const classes = useStyles();
  const navigate = useNavigate();
  const axios = require('axios')

  const { id } = useParams();
  const [user_nama, setNama] = useState('');
  const [user_jabatan, setJabatan] = useState('');
  const [user_email, setEmail] = useState('');
  // const [user_password, setPassword] = useState('123456');
  const [user_telp, setTelp] = useState('');
  const [levelId, setDivisi] = useState("");
  const [level_nama, setLevelNama] = useState("");
  const [user_admin, setAdmin] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      user_nama: user_nama,
      user_jabatan: user_jabatan,
      user_email: user_email,
      // user_password: user_password,
      user_telp: user_telp,
      level_id: levelId.level_id,
      user_admin: user_admin,
    };
    axios
      .post(`http://192.168.100.215:8080/datausers/update/${id}`, data)
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

  useEffect(() => {
    fetch(`http://192.168.100.215:8080/datausers/` + id)
      .then(res => res.json())
      .then(
        (result) => {
          setNama(result.datausers.user_nama);
          setJabatan(result.datausers.user_jabatan);
          setEmail(result.datausers.user_email);
          setTelp(result.datausers.user_telp);
          setDivisi(result.datausers.levelId);
          setLevelNama(result.datausers.level_nama);
          setAdmin(result.datausers.user_admin);

        }
      )
  }, [id])

  const fetchData = async () => {
    return await axios
      .get("http://192.168.100.215:8080/level")
      .then((result) => {
        const res = result.data;
        return res;
      });
  };

  useEffect(() => {

  }, [])

  const levelUser = [
    { label: 'SuperAdmin', value: '1' },
    { label: 'Approval', value: '2' },
    { label: 'Admin', value: '3' },
  ];

  const handleChange = (value) => {
    setDivisi(value);
  };

  const handleChange2 = (value) => {
    setAdmin(value);
  };



  return (
    <>
      <Card border="primary" style={{ width: '61rem' }}>
        <Card.Header style={{ fontWeight: 'bold', color: 'blue', fontSize: 20 }} >Update</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Nama
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={user_nama}
                  onChange={(e) => setNama(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Jabatan
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={user_jabatan}
                  onChange={(e) => setJabatan(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={user_email}
                  onChange={(e) => setEmail(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                No Telp
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={user_telp}
                  onChange={(e) => setTelp(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Divisi
              </Form.Label>
              <Col sm={10}>
                <AsyncSelect
                  autoFocus
                  cacheOptions
                  defaultOptions
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 }),
                  }}
                  loadOptions={fetchData}
                  getOptionLabel={(e) => e.level_nama}
                  getOptionValue={(option) => option.level_id}
                  onChange={(e) => handleChange(e)}
                  placeholder={level_nama}
                  isSearchable={false}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Level User
              </Form.Label>
              <Col sm={10}>
                <Select
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 }),
                  }}
                  options={levelUser}
                  value={levelUser}
                  onChange={(e) => handleChange2(e)}
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