import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  box: {
    height: 50,
    padding: 8
  }
}));

const dbo_konten = JSON.parse(localStorage.getItem("dbo_konten"));

function BasicExample() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [dbo_level, setLevel] = useState([]);
  const [dbo_konten, setKonven] = useState([]);
  const [dbo_level_link_konten, setLevelLink] = useState([]);
  const [dbo_level_link_id, setLevelLinkId] = useState([]);
  const [isChecked, setIsChecked] = React.useState([]);
  const [level_id, setLevelId] = useState("");
  const [konten_id, setKontenId] = useState("");
  const { id } = useParams()


const handleChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    console.log(value, checked);
    if (e.target.checked === true) {
      e.preventDefault();
      var data = {
        level_id: id,
        konten_id: e.target.id,
      };
      axios
        .post(`http://192.168.100.215:8080/levellink`, data)
        .then((res) => {
          if (res.status === 201) {
            swal({
              title: "Success",
              text: "Users Edited",
              icon: "success",
              showConfirmButton: false,
            });
            getLevelLink()
            // navigate(-1);
          }
        });
    } else {
      setIsChecked(isChecked.filter((e) => (e !== e.target.value)));
    }
  }

  const handleOnChange = useCallback((event) => {
    if (event.target.checked === true) {
      event.preventDefault();
      var data = {
        level_id: id,
        konten_id: event.target.id,
      };
      axios
        .post(`http://192.168.100.215:8080/levellink`, data)
        .then((res) => {
          if (res.status === 201) {
            swal({
              title: "Success",
              text: "Users Edited",
              icon: "success",
              showConfirmButton: false,
            });
            getLevelLink()
            // navigate(-1);
          }
        });
    }
  });

  const handleDelete = async (id) => {
    console.log(id)
    await axios.delete(`http://192.168.100.215:8080/levellinkbyid/${id}`);
    getLevelLink();
  };

  React.useEffect(() => {
    getKonven();
    getLevelLink()
  }, []);
  const getLevelLink = async () => {
    if (id) {
      try {
        const response = await axios.get(`http://192.168.100.215:8080/levellinkbyid/${id}`)
        const level_link_id = response.data.map((data) => {
          return data.level_link_id
        })
        const konten_id = response.data.map((data) => {
          return data.konten_id
        })
        console.log(konten_id)
        setLevelLinkId(level_link_id)
        setLevelLink(konten_id)
      } catch (error) {
        console.error(error);
      }
    }
  }

  const getKonven = async () => {
    try {
      const response = await axios.get(
        "http://192.168.100.215:8080/konven"
      );
      setKonven(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      axios.get(`http://192.168.100.215:8080/level/${id}`)
        .then(res => {
          setLevel(res.data)
        })
    }
  }, [id]);


  return (

    <>
      <Card border="primary" style={{ width: '61rem' }}>
        <Card.Header>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div" style={{ fontWeight: 'bold', color: 'blue', fontSize: 20 }}>
                  Level User Divisi : {dbo_level.level_nama}
                </Typography>
              </Grid>
              <Grid item xs>
                {/* <Typography>
                      <Button style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: "auto" }} color="primary" variant="contained" onClick={handleSubmit}>Submit</Button>
                    </Typography> */}
              </Grid>
            </Grid>
          </Box>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Menu</th>
                <th>Sub Menu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Produk Konvensional</td>
                <td>
                  {dbo_konten.map((konven, index) => (
                    <TableRow
                      key={konven.konten_id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <FormControlLabel
                        key={index}
                        className="twocolelement"
                        control={
                          <Checkbox
                            name={konven.konten_menu}
                            value={konven.konten_id}
                            id={konven.konten_id}
                            // checked={ isChecked[konven.konten_id]}
                            checked={dbo_level_link_konten[index] == konven.konten_id ? true : false}
                            color="primary"
                            onChange={handleOnChange}
                          />
                        }
                        label={konven.konten_menu}
                      />
                      <Button onClick={() => handleDelete(dbo_level_link_id[index])}>Delete</Button>
                    </TableRow>
                  ))}
                </td>
              </tr>
            </tbody>
          </Table>
          {/* <pre>{JSON.stringify(isCheckedSyar, null, 3)}</pre> */}
        </Card.Body>
      </Card>
    </>
  );
}



export default BasicExample;