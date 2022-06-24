import React, { useState, useMemo, useCallback } from 'react';
import Card from "./Card";
import axios from "axios";

import { Button } from '@mui/material';
import { Check, Close } from '@mui/icons-material';

import { IFilms } from "../interfaces/IData";

const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer sometoken`,
    },
};

function Main() {
    const [films, setFilms] = useState<Array<IFilms>>([
        {
            id: "1and3011",
            imageURL: `https://images-na.ssl-images-amazon.com/images/M/MV5BMTUzNTE2NTkzMV5BMl5BanBnXkFtZTgwMDAzOTUyMDI@._V1_SY1000_CR0,0,674,1000_AL_.jpg`,
            title: "Inferno",
            summary: "Lorem ipsum...",
            rating: 5.3
        },
        {
            id: "2301abc",
            imageURL: `https://images-na.ssl-images-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SY1000_CR0,0,677,1000_AL_.jpg`,
            title: "Star Wars: Episode VII - The Force Awakens",
            summary: "Lorem ipsum...",
            rating: 8.2
        },
        {
            id: "bro2011",
            imageURL: `https://m.media-amazon.com/images/M/MV5BNjhlZDRlN2UtN2E0MS00N2I4LTgxOGItMWYxZDU4ODY1ZWFjXkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_.jpg`,
            title: "Interstellar",
            summary: "Lorem ipsum...",
            rating: 10
        }
    ]);
    const [currentIndex, setCurrentIndex] = useState<number>(films.length - 1);

    const childRefs: any = useMemo(
        () =>
            Array(films.length)
                .fill(0)
                .map((i) => React.createRef()),
        [films.length]
    )

    const canSwipe = currentIndex >= 0

    const swipe = useCallback(async (dir: string, id: string) => {
        if ((currentIndex >= 0) && currentIndex < films.length) {
            await childRefs[currentIndex].current.swipe(dir)
        }
    }, [currentIndex, childRefs, films]);

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
        <div className="container">
            {films.map((filmData: IFilms, index: number) => (
                <Card
                    key={filmData.id}
                    film={filmData}
                    filmArr={films}
                    fref={childRefs[index]}
                    index={index}
                    sendReject={sendReject}
                    sendAccept={sendAccept}
                    updateCurrentIndex={updateCurrentIndex}
                />
            ))}
            {canSwipe &&
                <div className="buttons">
                    <Button
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<Check />}
                        onClick={() => acceptSwipe(films[currentIndex])}
                    >
                        Accept
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        endIcon={<Close />}
                        onClick={() => rejectSwipe(films[currentIndex])}
                    >
                        Reject
                    </Button>
                </div>
            }
        </div>
    )
}

export default Main