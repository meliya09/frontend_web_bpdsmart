import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function InfoDetail() {
  const [dbo_konten, setDetailInfo] = useState([]);
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      axios.get(`http://192.168.100.215:8080/detailinternalbyid/${id}`)
        .then(res => {
          setDetailInfo(res.data)
        })
    }
  }, [id]);

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 1000,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 300, height: 300 }}>
            <Img alt="image" src={`http://192.168.100.215:8080${dbo_konten.file_path}`} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div" style={{ textAlign: 'justify', fontWeight: 'bold', color: 'indigo', fontSize: 20 }}>
                {dbo_konten.konten_judul}
              </Typography>
              <Typography variant="body2" gutterBottom style={{ fontWeight: 'bold', fontSize: 16 }}>
                Deskripsi Berita :
              </Typography>
              <Typography variant="body2" style={{ textAlign: 'justify', color: '#424242', fontSize: 15 }}>
              <div dangerouslySetInnerHTML={{ __html: dbo_konten.konten_deskripsi }} />
              </Typography>
              {/* <a href={dbo_konten.konten_url}>
                {dbo_konten.konten_url}
              </a> */}
            </Grid>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
