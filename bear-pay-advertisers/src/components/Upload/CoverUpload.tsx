import React, { useState, useRef } from 'react'
import { Box } from '@mui/material'
import { useMutation } from '@apollo/client';
import { UploadAdsImage, UploadBrandCover, UploadStoreCover } from '../../graphQL/Mutations';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export type CoverImageType = 'brand' | 'store' | 'ads';


type Props = {
    handleSuccess: (fileName: string) => void;
    imagePlaceHolder: string;
    type: CoverImageType;
}


const CoverUpload = ({ handleSuccess, imagePlaceHolder, type }: Props) => {
    const { t } = useTranslation();


    const stringPlaceHolder = {
        brand: "1000px X 730px",
        store: "1000px X 730px",
        ads: "900px X 450px",
    }

    const [ApolloBrandUploadCover, { }] = useMutation(UploadBrandCover);
    const [ApolloStoreUploadCover, { }] = useMutation(UploadStoreCover);
    const [ApolloAdsUploadImage, { }] = useMutation(UploadAdsImage);

    const [selectedImage, setSelectedImage] = useState<string>('')
    const fileInput = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };

    const brandUploadCover = (file: File) => {
        // get the upload URI
        ApolloBrandUploadCover({
            variables: {
                mimetype: "images/png",
                fileSize: parseInt("2000")
            }
        }).then(({ data }) => {
            const uploadURI = data.genBrandCoverUploadURI;
            console.log(uploadURI);

            // create formData body
            const formData = new FormData();
            formData.append('encodeMethod', 'BINARY');
            formData.append('uploadFile', file, file.name);

            // Load the image to check its dimensions

            // Proceed with the upload
            fetch(uploadURI, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("CoverUpload:" + data.payload.filename);
                    handleSuccess(data.payload.filename);
                    alert("Upload Cover Successful!");
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    };


    //function to use apollo uplooad store cover
    const storeUploadCover = (file: File) => {
        // get the upload uri
        ApolloStoreUploadCover({
            variables: {
                mimetype: "images/png",
                fileSize: parseInt("2000")
            }
        }).then(({ data }) => {
            const uploadURI = data.genStoreCoverUploadURI;
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
                    console.log("CoverUpload:" + data.payload.filename);
                    handleSuccess(data.payload.filename);
                    alert("Upload Cover Successful!");
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    };



    const adsUploadImage = (file: File) => {
        console.log("adsUploadImage")
        // get the upload uri
        ApolloAdsUploadImage({
            variables: {
                mimetype: "images/png",
                fileSize: parseInt("2000")
            }
        }).then(({ data }) => {
            const uploadURI = data.genAdvertisementImageUploadURI;
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
                    console.log("Advertisement Image Upload:" + data.payload.filename);
                    handleSuccess(data.payload.filename);
                    alert("Upload Advertisement Image Successful!");
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
                    brand: { width: 1000, height: 730 },
                    store: { width: 1000, height: 730 },
                    ads: { width: 900, height: 450 },
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
                        brandUploadCover(file);
                        break;
                    case "store":
                        storeUploadCover(file);
                        break;
                    case "ads":
                        adsUploadImage(file);
                        break;
                    default:
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
            <Box display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}>
                <Box className="hover-image-container">
                    <img
                        alt="brand_cover"
                        width="100%"
                        src={selectedImage || imagePlaceHolder}
                        style={{
                            cursor: "pointer", borderRadius: "12px"
                        }}
                        onClick={handleClick}
                    />
                    <Box className="img_overlay cover_overlay">
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

export default CoverUpload
