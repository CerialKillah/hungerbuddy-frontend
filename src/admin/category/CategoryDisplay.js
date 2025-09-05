import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import {getData, serverURL, getDate ,getTime, postData,} from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles";
import {IconButton, Button, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle,} from "@mui/material";
import Swal from "sweetalert2";
import burger from "../../assets/burger.png";
import CloseIcon from "@mui/icons-material/Close";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    minHeight: "100%",
  },
  box: {
    width: 800,
    height: "auto",
    padding: 10,
  },
  heading: {
    width: "100%",
    height: "auto",
    background:
      "linear-gradient(90deg, hsla(321, 41%, 24%, 1) 0%, hsla(330, 53%, 77%, 1) 100%)",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: "24px",
    color: "#fff",
  },
  subTitleStyle: {
    fontWeight: 700,
    fontSize: 16,
    color: "#fff",
  },
  titleBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "30%",
    padding: 10,
  },
}));

export default function CategoryDisplay() {
  const classes = useStyle();
  const [categoryList, setCategoryList] = useState([]);
  const [open, setOpen] = useState(false);

  // ------------------------------------Category View-------------------------------------------

  const [categoryId, setCategoryId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState({
    bytes: "",
    fileName: burger,
  });

  const [error, setError] = useState({ fileError: null });

  const handleError = (label, message) => {
    setError((prev) => ({ ...prev, [label]: message }));
  };

  const validation = () => {
    var isError = false;
    if (categoryName.length == 0) {
      setError((prev) => ({
        ...prev,
        categoryName: "Pls Input Category Name....",
      }));
      isError = true;
    }

    if (categoryIcon.bytes.length == 0) {
      setError((prev) => ({
        ...prev,
        fileError: "Pls Upload Category Icon....",
      }));
      isError = true;
    }

    return isError;
  };

  const handleClick = async () => {
    var err = validation();
    if (err == false) {
      var formData = new FormData();
      formData.append("branchid", branchId);
      formData.append("categoryname", categoryName);
      formData.append("categoryicon", categoryIcon.bytes);
      formData.append("createddate", getDate());
      formData.append("createdtime", getTime());
      formData.append("userid", "xxxxx");

      var response = await postData("category/submit_category", formData);
      if (response.status) {
        Swal.fire({
          position: "bottom",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 2000,
          toast: true,
        });
      } else {
        Swal.fire({
          position: "bottom",
          icon: "error",
          title: response.message,
          showConfirmButton: false,
          timer: 2000,
          toast: true,
        });
      }
    }
  };

  const handleChange = (e) => {
    setCategoryIcon({
      bytes: e.target.files[0],
      fileName: URL.createObjectURL(e.target.files[0]),
    });
    setError((prev) => ({
      ...prev,
      fileError: null,
    }));
  };

  const showCategoryInterface = () => {
    return (
      <Grid container spacing={1}>
        <Grid size={12}>
          <div className={classes.heading}>
            <div className={classes.titleBox}>
              <div className={classes.titleStyle}>HungerBuddy</div>
              <div className={classes.subTitleStyle}>New Food Category</div>
            </div>
          </div>
        </Grid>
        <Grid size={12}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <TextField
              onChange={(e) => setBranchId(e.target.value)}
              label="Branch Name"
              fullWidth
              value={branchId}
            />
          </div>
        </Grid>
        <Grid size={12}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <TextField
              onChange={(e) => setCategoryName(e.target.value)}
              label="Category Name"
              value={categoryName}
              fullWidth
              helperText={error?.categoryName}
              error={error?.categoryName}
              onFocus={() => handleError("categoryName", null)}
            />
          </div>
        </Grid>
        <Grid size={6}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <Button
              onClick={handleClick}
              style={{ background: "hsla(321, 32%, 37%, 1.00)" }}
              fullWidth
              variant="contained"
            >
              Save
            </Button>
          </div>
        </Grid>
        <Grid size={6}>
          <div style={{ padding: "0px 5px 0px 5px" }}>
            <Button
              style={{ background: "hsla(321, 32%, 37%, 1.00)" }}
              fullWidth
              variant="contained"
            >
              Clear
            </Button>
          </div>
        </Grid>
      </Grid>
    );
  };

  // -------------------------------------Category View------------------------------------------

  const fetchAllCategory = async () => {
    var response = await getData("category/fetch_all_category");
    setCategoryList(response.data);
  };

  useEffect(function () {
    fetchAllCategory();
  }, []);

  const showDialog = () => {
    return (
      <div>
        <Dialog open={open} onClose={handleCloseDialog}>
          <IconButton
            onClick={handleCloseDialog}
            style={{
              marginLeft: "auto",
              display: "flex",
            }}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent>{showCategoryInterface()}</DialogContent>
        </Dialog>
      </div>
    );
  };

  const handleOpenDialog = (rowData) => {
    setCategoryId(rowData.categoryid);
    setBranchId(rowData.branchid);
    setCategoryName(rowData.categoryname);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const DisplayCategory = () => {
    return (
      <MaterialTable
        title="List of food categories"
        columns={[
          { title: "Branch Id", field: "branchid" },
          { title: "Category Name", field: "categoryname" },
          {
            title: "Icon",
            render: (rowData) => (
              <div>
                <img
                  style={{ width: "50px", height: "50px", borderRadius: "5px" }}
                  src={`${serverURL}/images/${rowData.categoryicon}`}
                />
              </div>
            ),
          },
        ]}
        data={categoryList}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit",
            onClick: (event, rowData) => handleOpenDialog(rowData),
          },
        ]}
      />
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>{DisplayCategory()}</div>
      {showDialog()}
    </div>
  );
}
