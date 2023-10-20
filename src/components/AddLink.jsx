import React,{useState} from 'react'
import {Form,Label,Row,Col,FormGroup} from 'reactstrap'
import { Loader } from '../components/Loader';
import { addLink } from '../utils';
import { MyAlert } from '../components/MyAlert';
import { useForm } from 'react-hook-form';



const classes=['12A/3','12A/2','11A/1','11A/2']
const projects=['Kajak-kenu']

export const AddLink = () => {
  const [loading, setLoading] = useState(false);
  const [uploaded,setUploaded]=useState(false)
const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onChange',});

  const onSubmit =async (data, e) => {
    e.preventDefault()
    setLoading(true);
   
    //console.log(data)
    try {
      addLink({...data,rate:[]})
      setUploaded(true)
    } catch (error) {
      console.error('Hiba a feltöltése közben', error);
    }finally {
      setLoading(false);
    //  console.log('sikeres feltöltés!');
   //alert('sikeres feltöltés!')
    }
    e.target.reset(); // reset after form submit
  };

 
  return (
    <div className='createLink   '>    
      <h3 className='text-center text-white'>Add projects links</h3>
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
                  {classes.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              <p>{errors?.class?.message}</p>
          </FormGroup>
        </Col>
      </Row>
     <Row>
      <FormGroup >
          <Label>GitHub link URL:</Label>
          <input className="form-control" type="text" {...register('linkUrl', { required: true })} />
          {errors.title && <p>GitHub link is required.</p>}
        </FormGroup>
     </Row>
     <Row >
        <Col className='d-flex justify-content-start'>
          <input type="submit" className='btn btn-primary' disabled={loading}/>
        </Col>
        <Col>
          {loading && <Loader />}
        </Col>
      </Row>
     
      {uploaded && <MyAlert txt={'Sikeres feltöltés!'}/>}
    </Form>
    </div>
  )
}
