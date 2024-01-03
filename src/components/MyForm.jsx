import React,{useState} from 'react'
import {Form,Label,Row,Col,FormGroup} from 'reactstrap'
import { useForm } from 'react-hook-form';
import {projects, readProjectResults} from '../utils'
import { useContext } from 'react';
import { ClassContext } from '../ClassContext';


export const MyForm = ({setResults,hContent}) => {
  const {classes}=useContext(ClassContext)
  const [hasSubmit,setHasSubmit]=useState(false)


const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onChange',});

  const onSubmit =async (data, e) => {
    e.preventDefault()
    readProjectResults(data.classmate,data.title,setResults)
    setHasSubmit(true)
    e.target.reset(); // reset after form submit
  };

  return (
    
    <div >
      <div className='createLink   '>
      <h3 className='text-center text-white'>{hContent}</h3>
      <Form onSubmit={handleSubmit(onSubmit)} className='border rounded p-3 bg-light'>
        <Row> 
          <Col md={6}>
            <FormGroup style={{maxWidth:'300px'}}>
              <Label>Title</Label>
              <select className='form-select' style={{maxWidth:'300px'}} {...register('title',
                  { required: true ,
                    validate:(value=>{
                      if(value==0) return 'You must choose one project title!!'
                    })
                  }
              )}>
                  <option value="0">select project title...</option>
                  {projects.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              <p>{errors?.title?.message}</p>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
            <Label>Class</Label>
              <select className='form-select' style={{maxWidth:'300px'}} {...register('classmate',
                  { required: true ,
                    validate:(value=>{
                      if(value==0) return 'You must choose one class!!'
                    })
                  }
              )}>
                  <option value="0">select class</option>
                  {classes && classes.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              <p>{errors?.class?.message}</p>
          </FormGroup>
        </Col>
      </Row>
      <Row >
        <Col className='d-flex justify-content-center'>
          <input type="submit" className='btn btn-primary' value="Show"/>
        </Col>
       
      </Row>
    </Form>
    </div>
    
   
    </div>
  )
}

