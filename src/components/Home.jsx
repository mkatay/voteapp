import React,{useState} from 'react'
import {Form,Label,Row,Col,FormGroup} from 'reactstrap'
import { Loader } from '../components/Loader';
import { readLinks} from '../utils';
import { MyAlert } from '../components/MyAlert';
import { useForm } from 'react-hook-form';
import {MyCard} from './MyCard';
import { PointsProvider } from '../PointsContext';



const classes=['12A/3','12A/2','11A/1','11A/2']
const projects=['Kajak-kenu']

export const Home = () => {
  const [links, setLinks] = useState(null);
  const [changed,setChanged]=useState(0)
  const [hasSubmit,setHasSubmit]=useState(false)
  
const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onChange',});

  const onSubmit =async (data, e) => {
    e.preventDefault()
    readLinks(data.classmate,data.title,setLinks)
    setHasSubmit(true)
    e.target.reset(); // reset after form submit
  };

 console.log(changed);
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
      <Row >
        <Col className='d-flex justify-content-center'>
          <input type="submit" className='btn btn-primary' value="Show projects"/>
        </Col>
       
      </Row>
    </Form>
    </div>
    <div className="d-flex flex-wrap gap-2">
       {(hasSubmit && links && links.length>0) && links.map(obj=>
      <div key={obj.id}>
        <PointsProvider id={obj.id}>
          <MyCard {...obj} setChanged={setChanged} changed={changed}/>
        </PointsProvider>
      </div>
      )}
      {(hasSubmit && links && links.length==0) && (<p className=' text-danger m-auto'>Nincsenek adatok a kért kategóriában!</p>)}

    </div>
   
    </div>
  )
}

