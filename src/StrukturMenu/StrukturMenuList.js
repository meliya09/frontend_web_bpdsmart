import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  box: {
    height: 50,
    padding: 8
  }
}));

export default function StrukturMenuList() {
  const classes = useStyles();
  const navigate = useNavigate();

  const data = [{ "menu": "Produk Konvensional", "konten_url":"/produkkonven"},
              { "menu": "Produk Syariah", "konten_url":"/produksyariah"},
              { "menu": "Informasi", "konten_url":"/informasi"},
              { "menu": "Internal", "konten_url":"/internal"},
            ];



  return (
    // View produk konven admin
    <>
      <Container>
        <Paper>

          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">No</TableCell>
                  <TableCell align="left">Menu Utama</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
              {data.map((row, index) => (
            <TableRow
            key={index}
            
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                 <TableCell align="right">{index+1}</TableCell>
                <TableCell align="left"><Link to ={`${row.konten_url}`}>{row.menu}</Link></TableCell>
                 
                  
                </TableRow>
           ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
}