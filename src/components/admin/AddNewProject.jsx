import React, { useState } from "react";
import { Form, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import { addProject } from "../../utils";

export const AddNewProject = () => {
  //const [hasSubmit, setHasSubmit] = useState(false);

  const {register, handleSubmit } = useForm({ mode: "onChange" });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    addProject({...data,descr:null})
    console.log(data);
    //setHasSubmit(true);
    e.target.reset(); // reset after form submit
  };

  return (
    <div >
        <h3 className="text-center text-white">Add new Project</h3>
        <Form onSubmit={handleSubmit(onSubmit)}  className="border rounded p-3 bg-light" >
            <Row >
                <Col className="d-flex justify-content-center m-2">
                    <input type="text" className="form-control"   {...register("name", { required: true })} />
                </Col>
            </Row>
            <Row>
            <Col className="d-flex justify-content-center">
                <input type="submit" className="btn btn-primary" value="Add" />
            </Col>
            </Row>
        </Form>
    </div>
  );
};
