import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import { useState } from "react";
import { useEffect } from "react";

import { deleteSelectedProject, readProjectRows } from "../../utils";
import { Loader } from "../Loader";
import { AddNewProject } from "./AddNewProject";
import { MyModal } from "./MyModal";

const columns = [
  { field: "id", headerName: "Project Id", width: 250 ,  headerClassName: 'text-primary',},
  { field: "name", headerName: "Project Name", width: 150,headerClassName: 'text-primary' },
  { field: "descr", headerName: "Description", width: 150,headerClassName: 'text-primary' },
];

export const AdminProjects = () => {
  const [rows, setRows] = useState([]);
  const [selection, setSelection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [descr,setDescr]=useState(null)

  useEffect(() => {
    readProjectRows(setRows);
  }, [loading]);

  const handleDelete = async () => {
    setLoading(true);
    await deleteSelectedProject(selection)
    setLoading(false);
  };
  const handleOnCellClick = (params) => {
   //setFinalClickInfo(params);
   console.log(params.field,params.value);
   if(params.field=='descr' && params.value){
    setDescr(params.value)
    setOpenModal(true)
   }
  };

  return (
    <div className="container">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
        }}
      >
        <Box sx={{ height: 400, maxWidth: "500px" ,background:'#f8f9fa',borderRadius:'10px'}}>
          {rows && (
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{pagination: {paginationModel: {pageSize: 5}}}}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(id) => setSelection(id)}
              onCellClick={handleOnCellClick}
            />
          )}
          <button className="btn btn-danger m-2" onClick={handleDelete}>
            delete selected projects
          </button>
        </Box>
        <AddNewProject/>
      </Box>

      {loading && <Loader />}
      {openModal && <MyModal openModal={openModal} setOpenModal={setOpenModal} descr={descr}/>}
    </div>
  );
};
