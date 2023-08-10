import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableHeader } from "../Interface/TableHeader";
import { RequestUser } from "../Interface/RequestUser";
import { useUserService } from "../Context/UserService";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useModal } from "../Context/ModalService";
import { showConfirmDialog } from "../../../utils/SweetalertComfirmDialog";

const header: TableHeader[] = [
  { name: "HN เจ้าของ", align: "center" },
  { name: "ชื่อเจ้าของ", align: "center" },
  { name: "เบอร์ติดต่อ", align: "center" },
  { name: "อีเมล์", align: "center" },
  { name: "จัดการ", align: "center" },
];

export default function TableUser() {
  const userService = useUserService();
  const { state, dispatch } = useModal();
  const [rowsBody, setRowsBody] = React.useState<RequestUser[]>([]);

  React.useEffect(() => {
    if (!userService) return;

    refetchAndSetTableRow();

    return () => {};
  }, [userService, state.isOpen]);

  const handleClickDelete = async (id: string) => {
    if (!userService) return;

    showConfirmDialog(
      async () => {
        await userService.deleteUser(id);
        refetchAndSetTableRow();
      },
      "คุณต้องการลบข้อมูลใช่หรือไม่ ?",
      "ตกลง",
      "warning"
    );
  };

  const handleClickEdit = (id: string) => {
    dispatch({
      type: "OPEN_MODAL",
      payload: {
        idEdit: id,  
      }
    })
  };

  function refetchAndSetTableRow() {
    console.log("refetchData");
    userService.getAllUser().then((res) => {
      setRowsBody(res);
    });
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} color="info" aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((item: TableHeader, index) => (
              <>
                <TableCell align={item.align}>{item.name}</TableCell>
              </>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsBody.map((row: RequestUser, index) => (
            <>
              <TableRow
                key={index}
                sx={{
                  "&> *": {
                    textAlign: "center",
                  },
                }} //ทำให้ align center ทุกตัว
              >
                <TableCell align="center">{row.hn}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.phoneNumber}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="secondary"
                    onClick={() => handleClickEdit(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleClickDelete(row.id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
