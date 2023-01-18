import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client'

import { GetStoresByCoordinate } from '../graphql/Queries';
const GetStoreCoordinate = () => {
    const { loading, error, data } = useQuery(GetStoresByCoordinate, { variables: { coordinate: { latitude: 24.1043367, longitude: 120.6 } } });
    const [stores, setStores] = useState([]);

    useEffect(() => {
        if (data) {
            console.log(data.getStoresByCoordinate);
            setStores(data.getStoresByCoordinate);
        }

    }, [data]);
    return (
        <div>
            {" "}
            {stores.map((val) => {
                return <h1>{val.name}</h1>;
            })}
        </div>
    );
}

export default GetStoreCoordinate