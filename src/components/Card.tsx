import { useCallback, useEffect, useState } from "react";
import { IFilms } from "../interfaces/IData";
import TinderCard from "react-tinder-card";

import CardMui from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type Props = {
    film: IFilms;
    filmArr: IFilms[];
    index: number;
    fref: any;
    sendReject: (data: IFilms) => void;
    sendAccept: (data: IFilms) => void;
    updateCurrentIndex: () => void;
}

function Card({ film, fref, sendReject, sendAccept, updateCurrentIndex }: Props) {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, [])

    const decideMovieDir = useCallback((dir: string) => {
        if (dir === "right") {
            updateCurrentIndex()
            sendReject(film)
        }
        if (dir === "left") {
            updateCurrentIndex()
            sendAccept(film)
        }
    }, [film, sendReject, sendAccept, updateCurrentIndex]);

    return (
        // <>
        <Grid item sx={{ position: 'absolute' }}>
            <TinderCard
                preventSwipe={['down', 'up']}
                className="card"
                ref={fref}
                flickOnSwipe
                onSwipe={decideMovieDir}
            >
                <CardMui sx={{ width: { xs: 200, md: 300 }, borderRadius: '10px' }}>
                    {loading ?
                        <Box sx={{ display: 'flex', justifyContent: 'center', height: '60vh', alignItems: 'center' }}>
                            <CircularProgress color="inherit" />
                        </Box>
                        :
                        <>
                            <Typography
                                variant='h6'
                                textAlign='center'
                                display='inline-block'
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: { xs: '17vh', md: '10vh' }
                                }}
                            >
                                {film.title} ({film.rating}/10)
                            </Typography>
                            <CardMedia
                                component="img"
                                image={film.imageURL}
                                alt="poster"
                                sx={{
                                    height: '40vh'
                                }}
                            />
                            <CardContent>
                                {film.summary}
                            </CardContent>
                        </>
                    }

                </CardMui>
            </TinderCard>
        </Grid>
        // </>
    )
}

export default Card