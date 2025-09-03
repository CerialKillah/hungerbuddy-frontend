import { Button, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import burger from "../../assets/burger.png";
import { useState } from "react";
import { getDate, getTime, postData } from "../../services/FetchNodeServices";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  box: {
    width: 600,
    height: "auto",
    border: "0.7px solid hsla(321, 41%, 24%, 1)",
    borderRadius: "5px",
    margin: "10px",
    paddingBottom: "10px",
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
export default function CategoryInterface() {
  var classes = useStyle();
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
      alert(response.status);
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

  return (
    <div className={classes.root}>
      <div className={classes.box}>
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
              />
            </div>
          </Grid>
          <Grid size={12}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <TextField
                onChange={(e) => setCategoryName(e.target.value)}
                label="Category Name"
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
                style={{ background: "hsla(321, 32%, 37%, 1.00)" }}
                endIcon={<CloudUploadIcon />}
                fullWidth
                component="label"
                variant="contained"
              >
                Category Icon
                <input onChange={handleChange} type="file" hidden multiple />
              </Button>
            </div>
          </Grid>
          <Grid size={6} style={{ display: "flex", justifyContent: "center", flexDirection:'column',alignItems:'center' }}>
            <div style={{ padding: "0px 5px 0px 5px" }}>
              <img src={categoryIcon.fileName} style={{ width: 40 }} />
            </div>
            <div
              style={{
                color: "#d32f2f",
                fontWeight: "400px",
                fontSize: "0.75rem",
                fontFamily: "Roboto, Helvetica, Arial",
                lineHeight: "1.666rem",
              }}
            >
              {error?.fileError == null ? "" : error.fileError}
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
      </div>
    </div>
  );
}
