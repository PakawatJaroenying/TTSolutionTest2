import { Box, Container, Typography, Button, Divider } from "@mui/material";
import React from "react";
import TableUser from "./components/TableUser";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useModal } from "./Context/ModalService";
import ModalForm from "./components/ModalForm";

function User() {
  const { state,dispatch } = useModal();

  const openModal = () => {
    dispatch({ type: "OPEN_MODAL" });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography>Users Table</Typography>
        <Button
          startIcon={<AddCircleIcon></AddCircleIcon>}
          variant="contained"
          color="primary"
          onClick={openModal}
        >
          Create New User
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box mt={3}>
        <TableUser />
      </Box>
      {state.isOpen && <ModalForm />}
    </Container>
  );
}

export default User;
