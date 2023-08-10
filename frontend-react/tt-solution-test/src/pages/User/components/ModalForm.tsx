import React, { useEffect } from "react";
import Modal from "@mui/material/Modal";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useModal } from "../Context/ModalService";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextFieldController from "./TextFieldController";
import { useUserService } from "../Context/UserService";
import { UserService } from "./../Interface/UserService";
import { showSubmitSuccess } from "../../../utils/SweetalertComfirmDialog";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export type Inputs = {
  HN: string;
  Name: string;
  PhoneNumber: string;
  Email: string;
};

const YUPschema = yup.object().shape({
  HN: yup
    .string()
    .required("กรุณากรอก HN")
    .test("is-length-8", "กรุณากรอก HN ที่มีความยาว 6 ตัวอักษร", (value) => {
      if (value) {
        return value.length === 6;
      }
      return true;
    }),
  Name: yup
    .string()
    .min(8, "กรุณากรอกอย่างน้อย 8 ตัวอักษร")
    .max(32)
    .required("กรุณากรอกชื่อ"),
  PhoneNumber: yup
    .string()
    .min(8, "กรุณากรอกอย่างน้อย 8 ตัวอักษร")
    .max(32)
    .required("กรุณากรอกเบอร์โทรศัพท์"),
  Email: yup
    .string()
    .email("กรุณากรอกอีเมล์ให้ถูกต้อง")
    .required("กรุณากรอกอีเมล์"),
});

const textFields = [
  { id: "HN", label: "HN เจ้าของ" },
  { id: "Name", label: "ชื่อเจ้าของ" },
  { id: "PhoneNumber", label: "เบอร์ติดต่อ" },
  { id: "Email", label: "อีเมล์" },
];

function ModalForm() {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<Inputs>({
    defaultValues: {
      HN: "",
      Name: "",
      PhoneNumber: "",
      Email: "",
    },
    resolver: yupResolver(YUPschema),
  });
  const { state, dispatch } = useModal();
  const UserService = useUserService();

  useEffect(() => {
    if (state.idEdit) {
      UserService?.getUserById(state.idEdit).then((res) => {
        if (res) {
          console.log("res", res);
          setValue("HN", res.hn);
          setValue("Name", res.name);
          setValue("PhoneNumber", res.phoneNumber);
          setValue("Email", res.email);
        }
      });
    }
  }, [state]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!state.idEdit) {
      UserService?.createUser(data).then((res) => {
        dispatch({ type: "CLOSE_MODAL" });
        showSubmitSuccess();
      });
    } else {
      UserService.updateUser(state.idEdit, data).then((res) => {
        dispatch({ type: "CLOSE_MODAL" });
        showSubmitSuccess();
      });
    }
  };

  const handleClose = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <>
      <Modal
        open={state.isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {(state.idEdit && "Edit User") || "Create New User"}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={"column"} mb={2}>
              {textFields.map((field) => (
                <TextFieldController
                  errors={errors}
                  control={control}
                  key={field.id}
                  id={field.id}
                  name={field.id as keyof Inputs}
                  label={field.label}
                />
              ))}
            </Stack>
            <Stack direction={"row"} gap={2} justifyContent={"flex-end"}>
              <Button variant="outlined" onClick={handleClose}>
                ยกเลิก
              </Button>
              <Button variant="contained" type="submit">
                บันทึก
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default ModalForm;
