import React from 'react'
import { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//     getGeocode,
//     getLatLng,
// } from "use-places-autocomplete";
import PlacesAutocomplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import { TextField } from '@mui/material';






const Maps = () => {

    const [{ address, city, district, coordinates }, setLocation] = useState({
        address: "",
        city: "",
        district: "",
        coordinates: {
            lat: null,
            lng: null,
        }
    });
    const [inputAddress, setInputAddress] = useState("");



    const handleLocationSelect = async value => {
        const results = await geocodeByAddress(value);
        console.log(results);
        const formattedAddress = results[0].address_components[0].long_name + results[0].address_components[1].long_name;
        const latLng = await getLatLng(results[0]);
        const city = results[0].address_components[4].long_name;
        const district = results[0].address_components[3].long_name;
        console.log(latLng);
        setInputAddress(value);
        setLocation({
            address: formattedAddress,
            city: city,
            district: district,
            coordinates: latLng
        });
        this.props.onAddressSelected();
    };

    //GOOGLE MAP
    // const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: "AIzaSyA_GZSFTz3_7EEx8vtqjNwkN7I3T-uInYc",
    //     // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // });

    const center = useMemo(() => ({ lat: 24.1043367, lng: 120.6 }), []);
    return (
        <>
            <p>Lat: {coordinates.lat}, Lng: {coordinates.lng} <br /> Address: {address} <br /> <br />City: {city}, District: {district} </p>
            <PlacesAutocomplete
                className="places_autocomplete"
                value={inputAddress}
                onChange={setInputAddress}
                onSelect={handleLocationSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <TextField
                            className="modal_input_textfield"
                            fullWidth
                            variant="filled"
                            type="text"
                            sx={{ marginBottom: "1rem", mr: '1rem', backgroundColor: "#1F2A40", borderRadius: "5px", color: "black" }}
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#111111', cursor: 'pointer' } //color when hover
                                    : { backgroundColor: '#cecece', cursor: 'pointer' }; //background color
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </>

    )

}
export default Maps

// const PlacesAutocomplete = ({ setSelected }) => {
//     const {
//         ready,
//         value,
//         suggestions: { status, data },
//         setValue,
//         clearSuggestions,
//     } = usePlacesAutocomplete({
//         requestOptions: {
//             location: { lat: () => 24.1043367, lng: () => 120.6 },
//             radius: 200 * 1000,
//         },
//     });

//     return (
//         <div className="search">
//             <Combobox
//                 onSelect={async (address) => {
//                     setValue(address, false);
//                     clearSuggestions();

//                     try {
//                         const results = await getGeocode({ address });
//                         const { lat, lng } = await getLatLng(results[0]);
//                         setSelected({ lat, lng });
//                     } catch (error) {
//                         console.log("error!");
//                     }
//                 }}
//             >
//                 <ComboboxInput
//                     value={value}
//                     onChange={(e) => {
//                         setValue(e.target.value);
//                     }}
//                     disabled={!ready}
//                     placeholder="Enter an address"
//                 />
//                 <ComboboxPopover>
//                     <ComboboxList>
//                         {status === "OK" &&
//                             data.map(({ id, description }) => (
//                                 <ComboboxOption key={id} value={description} />
//                             ))}
//                     </ComboboxList>
//                 </ComboboxPopover>
//             </Combobox>
//         </div>
//     );
// }