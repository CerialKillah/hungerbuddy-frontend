import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import { getData } from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    minHeight:"100vh",
    background: "#f7f7f7",
  },
  box: {
    width: 800,
    height: "auto",
    margin: "10px",
    padding: "10px",
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

  const fetchAllCategory = async () => {
    var response = await getData("category/fetch_all_category");
    setCategoryList(response.data);
  };

  useEffect(function () {
    fetchAllCategory();
  }, []);

  const DisplayCategory = () => {
    return (
      <MaterialTable
        title="List of food categories"
        columns={[
          { title: "Branch Id", field: "branchid" },
          { title: "Category Name", field: "categoryname" },
          { title: "Icon", field: "categoryicon" },
        ]}
        data={categoryList}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit",
            onClick: (event, rowData) => alert("You saved " + rowData.name),
          },
        ]}
      />
    );
  };

  return <div className={classes.root}>
    <div className={classes.box}>
        {DisplayCategory()}</div></div>;
}
