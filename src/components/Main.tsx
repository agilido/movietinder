import React, { useState, useMemo, useCallback } from 'react';
import Card from "./Card";
import axios from "axios";

import { Button, Grid } from '@mui/material';
import { Check, Close } from '@mui/icons-material';

import { IFilms } from "../interfaces/IData";

import FilmsJson from "../data/films.json"

const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer sometoken`,
    },
};

function Main() {
    const [currentIndex, setCurrentIndex] = useState<number>(FilmsJson.length - 1);

    const childRefs: any = useMemo(
        () =>
            Array(FilmsJson.length)
                .fill(0)
                .map((i) => React.createRef()),
        [FilmsJson.length]
    )

    const canSwipe = currentIndex >= 0

    const swipe = useCallback(async (dir: string, id: string) => {
        if ((currentIndex >= 0) && currentIndex < FilmsJson.length) {
            await childRefs[currentIndex].current.swipe(dir)
        }
    }, [currentIndex, childRefs, FilmsJson]);

    const updateCurrentIndex = useCallback(() => {
        setCurrentIndex(prev => prev - 1)
    }, []);

    const acceptSwipe = (filmInfo: IFilms) => {
        if (canSwipe) {
            swipe('left', filmInfo.id)
        }
    };

    const sendAccept = useCallback(async (filmInfo: IFilms) => {
        try {
            await axios
                .put(
                    `/recommendations/${filmInfo.id}/accept`,
                    filmInfo,
                    config
                )
        } catch (error: any) {
            if (error.response) {
                console.log(error.response.status);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error);
        }
    }, [])

    const rejectSwipe = (filmInfo: IFilms) => {
        if (canSwipe) {
            swipe('right', filmInfo.id);
        }
    };

    const sendReject = useCallback(async (filmInfo: IFilms) => {
        try {
            await axios
                .put(
                    `/recommendations/${filmInfo.id}/reject`,
                    filmInfo,
                    config
                )
        } catch (error: any) {
            if (error.response) {
                console.log(error.response.status);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error);
        }
    }, [])

    return (
        <Grid container sx={{
            marginTop: { xs: '5vh', md: '12vh' },
            display: 'flexbox',
            justifyContent: 'center',
            position: 'relative'
        }}>
            {FilmsJson.map((filmData: IFilms, index: number) => (
                <Card
                    key={filmData.id}
                    film={filmData}
                    filmArr={FilmsJson}
                    fref={childRefs[index]}
                    index={index}
                    sendReject={sendReject}
                    sendAccept={sendAccept}
                    updateCurrentIndex={updateCurrentIndex}
                />
            ))}
            {canSwipe &&
                <Grid container
                    sx={{
                        marginTop: { xs: '75vh', md: '70vh' },
                        display: 'flexbox',
                        width: { xs: '40vh', md: '30vh' },
                        justifyContent: 'space-between',
                    }}
                >
                    <Button
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<Check />}
                        onClick={() => acceptSwipe(FilmsJson[currentIndex])}
                    >
                        Accept
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        endIcon={<Close />}
                        onClick={() => rejectSwipe(FilmsJson[currentIndex])}
                    >
                        Reject
                    </Button>
                </Grid>
            }
        </Grid>
    )
}

export default Main