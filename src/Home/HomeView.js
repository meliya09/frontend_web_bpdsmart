import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const HomeView = () => {
    const [dbo_konten, setHome] = useState([]);

    useEffect(() => {
        getHome();
    }, []);

    const getHome = async () => {
        const response = await axios.get("http://192.168.100.215:8080/home");
        setHome(response.data);
    };

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
            <Typography gutterBottom variant="subtitle1" component="div" style={{ fontWeight: 'bold', color: 'blue', fontSize: 20 }}>
                Informasi dan Berita Terkini
            </Typography>
            {dbo_konten.map((home) => (
                <div style={{ padding: 20 }}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase sx={{ width: 300, height: 300 }}>
                                <Img alt="image" src={`http://192.168.100.215:8080${home.file_path}`} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" component="div" style={{ textAlign: 'justify', fontWeight: 'bold', color: 'indigo', fontSize: 20 }}>
                                        {home.konten_judul}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom style={{ fontWeight: 'bold', fontSize: 16 }}>
                                        Deskripsi Berita :
                                    </Typography>
                                    <Typography variant="body2" style={{ textAlign: 'justify', color: '#424242', fontSize: 15 }}>
                                        <div dangerouslySetInnerHTML={{ __html: home.konten_deskripsi }} />
                                    </Typography>
                                    <a href={home.konten_url}>
                                        {home.konten_url}
                                    </a>
                                </Grid>
                            </Grid>
                            <Grid item>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            ))}
        </Paper>


        // <div className="columns is-multiline mt-2">
        //     {dbo_konten.map((home) => (
        //         <div className="column is-one-quarter" key={home.konten_id}>
        //             <div className="card">
        //                 <div className="card-image">
        //                     <figure className="image is-4by3">
        //                     <img alt="image" src={`http://192.168.100.215:8080${home.file_path}`} />
        //                     </figure>
        //                 </div>
        //                 <div className="card-content">
        //                     <div className="media">
        //                         <div className="media-content">
        //                             <p className="title is-4">{home.konten_judul}</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="card-content">
        //                     <div className="media">
        //                         <div className="media-content">
        //                             <p className="title is-4">{home.konten_deskripsi}</p>
        //                         </div>
        //                     </div>
        //                 </div>

        //                 <footer className="card-footer">

        //                 </footer>
        //             </div>
        //         </div>
        //     ))}
        // </div>

    )
}

export default HomeView