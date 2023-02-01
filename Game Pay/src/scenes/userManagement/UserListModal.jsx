import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { UnbanMember } from "../../graphQL/Queries";
import { useLazyQuery } from "@apollo/client";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { default_logo_360x360_filename } from "../../data/strings";
import { getImgURL } from "../../utils/Utils";


const checkoutSchema = yup.object().shape({});


export default function UserListModal({ props }) {
  const buttonTitle = "詳細資料";
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [modal, setModal] = useState(false);

  var unbanTitle = "解封";


  const initialValues = {
    id: 0,
    status: "",
    nickname: "",
    birthday: "",

    avatar: default_logo_360x360_filename,
    phone: "",

    continuousLoginDays: "",
    totalLoginDays: "",
    lastSignAt: ""
  };

  if (props != null) {
    initialValues.id = props.id;
    initialValues.status = props.status.name;
    initialValues.nickname = props.profile.nickname;

    initialValues.phone = props.phone.number;

    initialValues.continuousLoginDays = props.career.continuousLoginDays;
    initialValues.totalLoginDays = props.career.totalLoginDays;

    if (props.profile.avatar !== null) {
      initialValues.avatar = props.profile.avatar;
    }
    if (props.profile.birthday !== null) {
      initialValues.birthday = props.profile.birthday;
    }
    if (props.career.lastSignAt !== null) {
      initialValues.lastSignAt = props.career.lastSignAt;
    }
  }


  // GQL
  const [ApolloUnbanUser, { loading: loading1, error: error1, data: data1 }] = useLazyQuery(UnbanMember);
  useEffect(() => {
    if (data1) {
      console.log(data1.getMember);
      window.location.reload();
    }
    else {
      console.log("NO DATA")
    }
  }, [data1]);


  const handleFormSubmit = (values) => {
    console.log("FORM SUBMIT");
  };


  const handleUnBan = (e) => {
    const targetId = e.target.id;
    console.log(targetId);
    var result = window.confirm("Are you sure you want to Unblock this user?");
    if (result) {
      ApolloUnbanUser({
        variables: {
          params: [
            {
              id: props.id,
              phone: {
                country: "tw",
                number: props.phone.number
              }
            }
          ],
          reason: "null"
        }
      })
    } else {
      console.log("not blocked");
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      {/* THE CONTENT OF THE BUTTON */}

      <Button onClick={toggleModal} className="btn-modal" sx={{ color: colors.primary[100], border: "1px solid #111", borderColor: colors.blueAccent[100] }}>{buttonTitle}
      </Button>

      {/* CONTENT OF WHAT HAPPEN AFTER BUTTON CLICKED */}
      {modal && (
        <Box className="modal">
          <Box onClick={toggleModal} className="overlay"></Box>
          <Box className="modal-content" backgroundColor={colors.primary[500]}>
            <Box m="20px">
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
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
                    <Box >
                      <Box display={"flex"} m={"1rem 0"}>
                        <Box width={"35%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                          <Typography variant="h2" sx={{ textAlign: "left", fontSize: "2rem", fontWeight: "600", color: "white", mt: "1rem" }}>
                            使用者
                          </Typography>
                          <Box textAlign="left">
                            {(() => {
                              if (initialValues.status === "disable") {
                                return (
                                  <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem 0" }}>
                                    停用
                                  </Typography>)
                              }
                              if (initialValues.status === "banned") {
                                return (
                                  <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem 0" }}>
                                    封鎖
                                  </Typography>)
                              }
                              else {
                                return (
                                  <Typography variant="h5" color={colors.greenAccent[500]} sx={{ margin: ".5rem 0" }}>
                                    正常
                                  </Typography>)
                              }
                            })()}
                          </Box>
                        </Box>
                        <Box width={"65%"} display={"flex"} justifyContent={"flex-end"} >
                          <img
                            alt="profile-user"
                            width="100px"
                            height="100px"
                            src={getImgURL(values.avatar)}
                            style={{ borderRadius: "50%" }}
                          />
                        </Box>
                      </Box>



                      <TextField className="modal_input_textfield"
                        disabled={true}
                        fullWidth
                        variant="filled"
                        type="text"
                        label="暱稱"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.nickname}
                        name="username"
                        error={!!touched.nickname && !!errors.nickname}
                        helperText={touched.nickname && errors.nickname}
                        sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                      />
                      {/* PHONE */}
                      <TextField
                        disabled={true}
                        fullWidth
                        variant="filled"
                        type="text"
                        label="手機"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phone}
                        name="phone"
                        error={!!touched.phone && !!errors.phone}
                        helperText={touched.phone && errors.phone}
                        sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                      />
                      <TextField
                        disabled={true}
                        fullWidth
                        variant="filled"
                        type="text"
                        label="使用者生日"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.birthday}
                        name="birthday"
                        error={!!touched.birthday && !!errors.birthday}
                        helperText={touched.birthday && errors.birthday}
                        sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                      />

                      <Box display={"flex"}>
                        <TextField
                          disabled={true}
                          fullWidth
                          variant="filled"
                          type="text"
                          label="連續登錄天數"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.continuousLoginDays}
                          name="continuousLoginDays"
                          error={!!touched.continuousLoginDays && !!errors.continuousLoginDays}
                          helperText={touched.continuousLoginDays && errors.continuousLoginDays}
                          sx={{ marginBottom: "1rem", mr: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                        <TextField
                          disabled={true}
                          fullWidth
                          variant="filled"
                          type="text"
                          label="總登錄天數"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.totalLoginDays}
                          name="totalLoginDays"
                          error={!!touched.totalLoginDays && !!errors.totalLoginDays}
                          helperText={touched.totalLoginDays && errors.totalLoginDays}
                          sx={{ marginBottom: "1rem", mr: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                        <TextField
                          disabled={true}
                          fullWidth
                          variant="filled"
                          type="text"
                          label="最後登錄"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.lastSignAt}
                          name="lastSignAt"
                          error={!!touched.lastSignAt && !!errors.lastSignAt}
                          helperText={touched.lastSignAt && errors.lastSignAt}
                          sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                      </Box>


                    </Box>
                    <Box display="flex" justifyContent="center" padding="1rem 0" >

                      {values.status === "banned" ? (
                        <Button onClick={handleUnBan} id={values.id} variant="contained" sx={{ minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", border: "2px solid #fff" }}>
                          <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "white" }}>
                            {unbanTitle}
                          </Typography>
                        </Button>
                      ) : (
                        <ConfirmModal props={{ type: "member", id: props.id, phone: { country: "tw", number: props.phone.number } }} />
                      )}

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
  );
}
