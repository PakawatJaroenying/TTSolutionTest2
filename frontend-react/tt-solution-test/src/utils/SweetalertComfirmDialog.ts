// ES6 Modules or TypeScript
import Swal from "sweetalert2";

export function showConfirmDialog(
  handleClickConfirm: () => Promise<void>,
  title: string,
  text: string,
  icon: "warning" | "error" | "success" | "info" | "question" = "warning"
) {
  Swal.fire({
    title: title,
    text: title,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: text,
    cancelButtonText: "ยกเลิก",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await handleClickConfirm();
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
}

export function showSubmitSuccess() {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
}
