import React,{useState,useEffect} from 'react'
import {Form,Label,Row,Col,FormGroup} from 'reactstrap'
import {  readLinks} from '../utils';
import { useForm } from 'react-hook-form';
import {MyCard} from './MyCard';
import { PointsProvider } from '../PointsContext';
import { useContext } from 'react';
import { ClassContext } from '../ClassContext';


export const Home = () => {
  const [links, setLinks] = useState(null);
  const [changed,setChanged]=useState(0)
  const [hasSubmit,setHasSubmit]=useState(false)
  const {classes,projects}=useContext(ClassContext)
  const [imgSrc,setImgSrc]=useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onChange',});

  const onSubmit =async (data, e) => {
    e.preventDefault()
    readLinks(data.classmate,data.title,setLinks,setImgSrc)
    setHasSubmit(true)
    e.target.reset(); // reset after form submit
  };

 console.log(classes);
  return (
    
    <div >
      <div className='createLink   '>
      <h3 className='text-center text-white'>Projects</h3>
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
                  {projects && projects.map(c=><option key={c} value={c}>{c}</option>)}
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
                  {classes && classes.map(c=><option key={c.id} value={c.id}>{c.class}-{c.year}</option>)}
              </select>
              <p>{errors?.class?.message}</p>
          </FormGroup>
        </Col>
      </Row>
      <Row >
        <Col className='d-flex justify-content-center'>
          <input type="submit" className='btn btn-primary' value="Show projects"/>
        </Col>
       
      </Row>
    </Form>
    </div>
    <div className="d-flex flex-wrap gap-2 justify-content-center">
       {(hasSubmit && links && links.length>0) && links.map(obj=>
      <div key={obj.id}>
        <PointsProvider id={obj.id}>
          <MyCard {...obj} setChanged={setChanged} changed={changed} imgSrc={imgSrc}/>
        </PointsProvider>
      </div>
      )}
      {(hasSubmit && links && links.length==0) && (<p className=' text-danger m-auto'>Nincsenek adatok a kért kategóriában!</p>)}

    </div>
   
    </div>
  )
}

