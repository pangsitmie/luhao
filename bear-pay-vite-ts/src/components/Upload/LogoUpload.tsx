import React, { useState, useRef } from 'react'
import { Box } from '@mui/material'
import { useMutation } from '@apollo/client';
import { UploadBrandLogo, UploadBillboardImage } from '../../graphQL/Mutations';

type ImageType = 'brand' | 'logo' | 'billboard';

type Props = {
    handleSuccess: (fileName: string) => void;
    imagePlaceHolder: string;
    type: ImageType;
}
const LogoUpload = ({ handleSuccess, imagePlaceHolder, type }: Props) => {
    const stringPlaceHolder = {
        brand: "Upload 900x300 image",
        logo: "Upload 360x360 image",
        billboard: "Upload 600x600 image",
    }
    const [ApolloBrandUploadLogo, { }] = useMutation(UploadBrandLogo);
    const [ApolloBillboardUploadImage, { }] = useMutation(UploadBillboardImage);

    const [selectedImage, setSelectedImage] = useState<string>('')
    const fileInput = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };

    //function to use apollo uplooad store cover
    const billboardUploadImage = (file: File) => {
        // get the upload uri
        ApolloBillboardUploadImage({
            variables: {
                mimetype: "images/png",
                fileSize: parseInt("2000")
            }
        }).then(({ data }) => {
            const uploadURI = data.genBillboardImageUploadURI;
            console.log(uploadURI);

            //create formData body
            const formData = new FormData();
            formData.append('encodeMethod', 'BINARY');
            formData.append('uploadFile', file, file.name);

            fetch(uploadURI, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Billboard Image Upload:" + data.payload.filename);
                    handleSuccess(data.payload.filename);
                    alert("Upload Billboard Image Successful!");
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    };

    //function to use apollo uplooad store cover
    const brandUploadLogo = (file: File) => {
        // get the upload uri
        ApolloBrandUploadLogo({
            variables: {
                mimetype: "images/png",
                fileSize: parseInt("2000")
            }
        }).then(({ data }) => {
            const uploadURI = data.genBrandLogoUploadURI;
            console.log(uploadURI);

            //create formData body
            const formData = new FormData();
            formData.append('encodeMethod', 'BINARY');
            formData.append('uploadFile', file, file.name);

            fetch(uploadURI, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("LogoUpload:" + data.payload.filename);
                    handleSuccess(data.payload.filename);
                    alert("Upload Logo Successful!");
                })
                .catch((error) => {
                    console.error(error);
                });

        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            // a file was selected, proceed with the upload
            console.log("file selected");
            switch (type) {
                case "brand":
                    brandUploadLogo(file);
                    break;
                case "billboard":
                    billboardUploadImage(file);
                    break;
                default:
                    alert("Error: No type selected");
                    break;
            }
        } else {
            // no file was selected, do nothing
            console.log("no file selected");
        }

    };


    return (
        <Box >
            {/* LOGO */}
            <Box display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}>
                <Box className="hover-image-container">
                    <img
                        alt="profile-user"
                        width="120px"
                        height="120px"
                        style={{ cursor: "pointer", borderRadius: "50%" }}
                        src={selectedImage || imagePlaceHolder}
                        onClick={handleClick}
                    />
                    <Box className="img_overlay logo_overlay">
                        <Box className="hover-text">{stringPlaceHolder[type]}</Box>
                    </Box>
                </Box>
                <input
                    type="file"
                    ref={fileInput}
                    style={{ display: 'none' }}
                    onChange={handleChange}
                />
            </Box>
        </Box>
    )
}

export default LogoUpload