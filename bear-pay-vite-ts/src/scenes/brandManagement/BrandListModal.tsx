import { useState, useEffect, } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { useQuery, useLazyQuery, useMutation, DocumentNode } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { GetBrand, RemoveBrand, UnbanBrand, } from "../../graphQL/Queries";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { getImgURL, replaceNullWithEmptyString } from "../../utils/Utils";
import LogoUpload from "../../components/Upload/LogoUpload";
import CoverUpload from "../../components/Upload/CoverUpload";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { PatchBrand } from "../../graphQL/Mutations";
import { BRAND_UpdateBrand } from "../../graphQL/BrandPrincipalQueries";
import { toast } from "react-toastify";
import BrandType from "../../types/Brand";
import { RootState } from "../../redux/store";




type Props = {
  props: BrandType
  onUpdate: () => void
}

interface FormValues {
  id: string;
  name: string;
  intro: string;
  principalName: string;
  principaPhone: string;
  principalLineUrl: string;
  principalEmail: string;
  vatNumber: string;
  brandCoinName: string;
}

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  // intro: yup.string().required("required"),
  principalName: yup.string().required("required"),
  principalLineUrl: yup.string().required("required"),
  // principalPassword: yup.string().matches(passwordRegex, "must contain at least one letter and one number, and be at least six characters long"),
  vatNumber: yup.string().required("required"),
  brandCoinName: yup.string().required("required"),
});
const BrandListModal = ({ props, onUpdate }: Props) => {
  const { entityName } = useSelector((state: RootState) => state.entity);

  const { t } = useTranslation();

  //========================== THEME ==========================
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // ========================== STATES AND HANDLERS ==========================
  var btnTitle = t("view"), modalTitle = t("details"), confirmTitle = t("update"), deleteTitle = t("delete"), banTitle = t("ban"), unbanTitle = t("unban");

  const [modal, setModal] = useState(false); //open or close modal
  const toggleModal = () => {
    setModal(!modal);
  };

  const [status, setStatus] = useState('disable');
  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value);
  };

  //========================== INITIAL VALUES ==========================
  const [initialValues, setInitialValues] = useState<FormValues>({
    id: "",
    name: "",
    intro: "",
    principalName: "",
    principaPhone: "",
    principalLineUrl: "",
    principalEmail: "",
    vatNumber: "",
    brandCoinName: "",
  });


  //========================== GRAPHQL ==========================

  let UPDATE_BRAND_MUTATION: DocumentNode = PatchBrand;
  switch (entityName) {
    case 'company':
      UPDATE_BRAND_MUTATION = PatchBrand;
      break;
    case 'brand':
      UPDATE_BRAND_MUTATION = BRAND_UpdateBrand;
      break;
    case 'store':
      UPDATE_BRAND_MUTATION = PatchBrand;
      break;
    default:
      break;
  }

  // ============ UPDATE BRAND ============
  const [ApolloUpdateBrand, { loading: loadingUpdate, error: errorUpdate, data: dataUpdate }] = useMutation(UPDATE_BRAND_MUTATION);
  useEffect(() => {
    if (errorUpdate) {
      console.log(errorUpdate);
    }
  }, [errorUpdate]);
  // ============ REMOVE BRAND ============
  const [ApolloRemoveBrand, { loading: loadingRemove, error: errorRemove, data: dataRemove }] = useLazyQuery(RemoveBrand);
  const handleDelete = () => {
    var result = window.confirm("Are you sure you want to delete this brand?");
    if (result) {
      ApolloRemoveBrand({
        variables: {
          args: [
            {
              id: props.id
            }
          ]
        }
      })
    }
  };
  // ============ UNBAN BRAND ============
  const [ApolloUnBanMachine, { loading: loadingUnBan, error: errorUnBan, data: dataUnBan }] = useLazyQuery(UnbanBrand);
  const handleUnBan = () => {
    var result = window.confirm("Are you sure you want to unban this machine?");
    if (result) {
      ApolloUnBanMachine({
        variables: {
          args: [
            {
              id: props.id
            }
          ],
        }
      })
    }
  }

  useEffect(() => {
    if (dataUpdate) {
      onUpdate();
      refetch();
      if (entityName === "brand") {
        toast.success(t("review_sent"));
      }
      else {
        toast.success(t("update_success"));
      }
    }
    if (dataRemove) {
      onUpdate();
      toast.success(t("delete_success"));
    }
    if (dataUnBan) {
      onUpdate();
    }
  }, [dataUpdate, dataRemove, dataUnBan]);

  const handleFormSubmit = (values: FormValues) => {
    const variables = {
      brandId: values.id,
      name: values.name,
      vatNumber: values.vatNumber,
      logo: logoFileName,
      cover: coverFileName,
      principal: {
        name: values.principalName,
        lineUrl: values.principalLineUrl,
        email: values.principalEmail || undefined,
      },
      intro: values.intro !== "" ? values.intro : undefined,
      statusId: status !== "banned" ? status : undefined,
    };

    console.log(variables);

    ApolloUpdateBrand({ variables });
    toast.success(t("update_success"));
  };

  // INITIAL VALUES FROM GET BRAND QUERY
  const { loading: loadingInit, error: errorInit, data: dataInit, refetch } = useQuery(GetBrand
    , {
      variables: {
        args: [
          {
            id: props.id
          }
        ],
      },
      skip: !modal, // Skip the query when modal is closed
    }
  );
  useEffect(() => {
    if (dataInit) {
      const nonNullData = replaceNullWithEmptyString(dataInit.getBrand[0]);

      setInitialValues({
        id: props.id,
        // status: nonNullData.status,
        name: nonNullData.name,
        vatNumber: nonNullData.vatNumber,
        intro: nonNullData.intro,
        principalName: nonNullData.principal.name,
        principaPhone: nonNullData.principal.phone.number,
        principalLineUrl: nonNullData.principal.lineUrl,
        principalEmail: nonNullData.principal.email,
        //password doesnt have initial value
        brandCoinName: nonNullData.currency.name,
      });

      if (nonNullData.logo !== null || (nonNullData.logo !== "null")) {
        setLogoFileName(nonNullData.logo);
      }
      if (nonNullData.cover !== null || (nonNullData.cover !== "null")) {
        setCoverFileName(nonNullData.cover);
      }
      //set status only if not banned
      if (nonNullData.status !== "banned") {
        setStatus(nonNullData.status)
      }

    }
  }, [dataInit]);

  // =========================== FILE UPLOAD ===========================
  const [logoFileName, setLogoFileName] = useState('');
  const handleUploadLogoSuccess = (name: string) => {
    setLogoFileName(name);
  };

  const [coverFileName, setCoverFileName] = useState('');
  const handleUploadCoverSucess = (name: string) => {
    setCoverFileName(name);
  };

  //========================== RENDER ==========================
  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      {/* THE CONTENT OF THE BUTTON */}
      <Button onClick={toggleModal} className="btn-modal" sx={{ color: colors.primary[100], border: "1px solid #111", borderColor: colors.blueAccent[100] }}>
        {btnTitle}
      </Button>

      {/* CONTENT OF WHAT HAPPEN AFTER BUTTON CLICKED */}
      {modal && (
        <Box className="modal">
          <Box onClick={toggleModal} className="overlay"></Box>
          <Box
            className="modal-content"
            sx={{
              backgroundColor: colors.primary[500],
            }}>
            <Box m="20px">
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
                enableReinitialize={true}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box>
                      <Typography variant="h2" sx={{ textAlign: "center", fontSize: "1.4rem", fontWeight: "600", color: colors.grey[200] }}>
                        {modalTitle}
                      </Typography>

                      <Box textAlign="center" display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        {(() => {
                          if (status === "disable") {
                            return (
                              <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem .5rem" }}>
                                {t("disable")}
                              </Typography>)
                          }
                          if (status === "banned") {
                            return (
                              <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                {t("banned")}
                              </Typography>)
                          }
                          else {
                            return (
                              <Typography variant="h5" color={colors.greenAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                {t("normal")}
                              </Typography>)
                          }
                        })()}
                      </Box>

                      {/* UPLOAD LOGO & COVER BOX */}
                      <Box display="flex" m={"1rem 0"} gap={".5rem"}>
                        <Box width={"30%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                          {/* UPLOAD LOGO COMPONENT */}
                          <LogoUpload handleSuccess={handleUploadLogoSuccess} imagePlaceHolder={getImgURL(logoFileName, "logo") || ''} type={"brand"} />
                        </Box>

                        <Box width={"70%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                          {/* UPLOAD COVER COMPONENET */}
                          <CoverUpload handleSuccess={handleUploadCoverSucess} imagePlaceHolder={getImgURL(coverFileName, "cover") || ''} type={"brand"} />
                        </Box>
                      </Box>

                      <Box display={"flex"} justifyContent={"space-between"}>

                        <TextField className="modal_input_textfield"
                          fullWidth
                          variant="filled"
                          type="text"
                          label={t("brand_name")}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          name="name"
                          error={!!touched.name && !!errors.name}
                          helperText={touched.name && errors.name}
                          sx={{ marginBottom: "1rem", mr: '1rem', backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label={t("vat_number")}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.vatNumber}
                          name="vatNumber"
                          error={!!touched.vatNumber && !!errors.vatNumber}
                          helperText={touched.vatNumber && errors.vatNumber}
                          sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />

                        <FormControl sx={{ minWidth: 150 }}>
                          <InputLabel id="demo-simple-select-label" >{status}</InputLabel>
                          <Select
                            disabled={status === "banned"}
                            sx={{ borderRadius: "10px", background: colors.primary[400] }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="status"
                            onChange={handleStatusChange}
                          >
                            <MenuItem value={"normal"}>{t('normal')}</MenuItem>
                            <MenuItem value={"disable"}>{t('disable')}</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      <TextField
                        id="outlined-multiline-flexible"
                        multiline
                        fullWidth
                        maxRows={4}
                        variant="filled"
                        type="text"
                        label={t("brand_intro")}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.intro}
                        name="intro"
                        error={!!touched.intro && !!errors.intro}
                        helperText={touched.intro && errors.intro}
                        sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        disabled={true}
                        label={t("brand_coin_name")}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.brandCoinName}
                        name="brandCoinName"
                        error={!!touched.brandCoinName && !!errors.brandCoinName}
                        helperText={touched.brandCoinName && errors.brandCoinName}
                        sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                      />

                      <Typography variant="h5" sx={{ textAlign: "left", margin: "1rem 0 .5rem 0", color: colors.grey[200] }}>{t('principal_name')}</Typography>


                      <Box display={"flex"} justifyContent={"space-between"} >
                        <TextField
                          disabled={true}
                          fullWidth
                          variant="filled"
                          type="text"
                          label={`${t('person_name')}`}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.principalName}
                          name="principalName"
                          error={!!touched.principalName && !!errors.principalName}
                          helperText={touched.principalName && errors.principalName}
                          sx={{ marginBottom: "1rem", mr: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />

                        <TextField
                          disabled={true}
                          fullWidth
                          variant="filled"
                          type="text"
                          label={t("line_url")}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.principalLineUrl}
                          name="principalLineUrl"
                          error={!!touched.principalLineUrl && !!errors.principalLineUrl}
                          helperText={touched.principalLineUrl && errors.principalLineUrl}
                          sx={{ margin: "0rem 0 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                      </Box>

                      <Box display={"flex"} justifyContent={"space-between"} >
                        <TextField
                          disabled={true}
                          fullWidth
                          variant="filled"
                          type="text"
                          label={t("phone")}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.principaPhone}
                          name="principaPhone"
                          error={!!touched.principaPhone && !!errors.principaPhone}
                          helperText={touched.principaPhone && errors.principaPhone}
                          sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />

                        <TextField
                          disabled={true}
                          fullWidth
                          variant="filled"
                          type="text"
                          label={t("email")}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.principalEmail}
                          name="principalEmail"
                          error={!!touched.principalEmail && !!errors.principalEmail}
                          helperText={touched.principalEmail && errors.principalEmail}
                          sx={{ margin: "0rem 0rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                      </Box>


                    </Box>
                    <Box display="flex" justifyContent="center" >
                      {entityName === 'company' ? (
                        <Button
                          onClick={handleDelete}
                          variant="contained"
                          sx={{
                            backgroundColor: colors.primary[400], minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", border: "2px solid #fff",
                            ':hover': {
                              bgcolor: colors.grey[300],
                              border: '1px solid' + colors.primary[800],
                              color: "white"
                            }
                          }}>
                          <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: colors.primary[100] }}>
                            {deleteTitle}
                          </Typography>
                        </Button>
                      ) : null}

                      {entityName === 'company' ? (
                        status === "banned" ? (
                          <Button
                            onClick={handleUnBan}
                            variant="contained"
                            sx={{
                              backgroundColor: "transparent",
                              minWidth: "100px",
                              padding: ".5rem 1.5rem",
                              margin: "0 1rem",
                              borderRadius: "10px",
                              border: "2px solid #fff",
                              '&:hover': {
                                backgroundColor: "transparent",
                                opacity: ".9",
                              }
                            }}>
                            <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: colors.primary[100] }}>
                              {unbanTitle}
                            </Typography>
                          </Button>
                        ) : (
                          <ConfirmModal props={{ type: "brand", id: props.id }} />
                        )
                      ) : null}



                      <Button type="submit" color="success" sx={{
                        minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", background: colors.grey[100],
                        ':hover': {
                          bgcolor: colors.grey[300],
                          border: '1px solid' + colors.grey[800],
                        }
                      }}>
                        <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: colors.grey[800] }}>
                          {confirmTitle}
                        </Typography>
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box >
          </Box>
        </Box>
      )
      }
    </>
  )
}
export default BrandListModal