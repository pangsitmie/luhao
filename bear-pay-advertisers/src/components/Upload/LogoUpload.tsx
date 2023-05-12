import React, { useState, useRef } from 'react'
import { Box } from '@mui/material'
import { useMutation } from '@apollo/client';
import { UploadBrandLogo, UploadBillboardImage } from '../../graphQL/Mutations';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

type LogoImageType = 'brand' | 'billboard';

type Props = {
    handleSuccess: (fileName: string) => void;
    imagePlaceHolder: string;
    type: LogoImageType;
}
const LogoUpload = ({ handleSuccess, imagePlaceHolder, type }: Props) => {
    const { t } = useTranslation();

    const stringPlaceHolder = {
        brand: "360px X 360px",
        billboard: "900px X 900px",
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

            const filesize = file.size;
            const fileType = file.type;

            // Check file size
            const maxSize = 8 * 1048576; // 8MB in bytes
            if (filesize > maxSize) {
                toast.warning(`${t('image_about_file_size')}`);
                return;
            }


            // Check file type (optional)
            // You can define an array of allowed file types and check if the uploaded file's type is in that array
            const allowedTypes = ["image/png", "image/jpeg"]; // Example: allow only PNG and JPEG images
            if (!allowedTypes.includes(fileType)) {
                toast.warning(`${t('invalid_image_type')}`);
                return;
            }
            const img = new Image();
            img.onload = function () {
                const width = (this as HTMLImageElement).naturalWidth;
                const height = (this as HTMLImageElement).naturalHeight;
                console.log(`Image dimensions: ${width}px X ${height}px`);


                const expectedDimensions = {
                    brand: { width: 360, height: 360 },
                    billboard: { width: 900, height: 900 },
                };

                const expectedWidth = expectedDimensions[type].width;
                const expectedHeight = expectedDimensions[type].height;

                // Check image dimensions
                if (width !== expectedWidth || height !== expectedHeight) {
                    toast.warning(`${t('invalid_image_dimension')} (${expectedWidth}px X ${expectedHeight}px)`);
                    return;
                }

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
            };

            img.src = URL.createObjectURL(file);
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