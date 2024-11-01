import { useState } from 'react';
import './App.css';
import {Button, Grid, TextField, Typography} from "@mui/material";
function App() {
    const [file, setFile] = useState(null);
    const [link, setLink] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        setLink(data.link);
    };

    return (
        <div>
            <Grid
                container
                direction="row"
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h2" gutterBottom>
                    Partage de fichier
                </Typography>
            </Grid>
            <Grid container
                alignItems="center"
                justifyContent="center"
                style={{ height: '50vh' }}
            >
                <Grid item>
                    <TextField type="file" onChange={handleFileChange} />
                </Grid>
            </Grid>
            <Grid container
                  alignItems="center"
                  justifyContent="center"
                  style={{ height: '2vh' }}
            >
                <Button onClick={handleUpload} variant="contained">Upload</Button>
                {link && (
                    <div className="link-container">
                        <p>Partager ce lien :</p>
                        <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                    </div>
                )}
            </Grid>
        </div>
    );
}

export default App;
