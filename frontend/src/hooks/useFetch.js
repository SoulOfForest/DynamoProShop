import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import axios from '../axios'

export const useFetch = (URL) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                
                const response = await axios.get(URL);
                const data = await response.data;

                ReactDOM.unstable_batchedUpdates(() => {
                    setResponse(data);
                    setLoading(false);
                });
            } catch (err) {
                setError(err);
            }
        }

        fetchData();
    }, []);

    return {
        response,
        loading,
        error
    }
}