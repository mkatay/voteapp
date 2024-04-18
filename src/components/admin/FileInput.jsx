import { useState, useEffect } from "react";
import {Button,Box} from "@mui/material"
import {Alerts} from '../Alerts'


export const FileInput = ({setImage}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [err,setErr]=useState(null)


  useEffect(() => {
    if(selectedImage){
      setImageUrl(URL.createObjectURL(selectedImage));
      setImage(selectedImage);
    }
  }, [selectedImage]);

  const handleChange=(event)=>{
    setImageUrl(null)
    setErr(null)
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 1 * 1000 * 1024) {
        setErr("File with maximum size of 1MB is allowed");
        return false;
      }
    setSelectedImage(event.target.files[0])
    }
}
console.log(err);

  return (
    <Box sx={{display:'flex'}}>
      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: "none" }}
        onChange={handleChange}
        required
      />
      <label htmlFor="select-image">
        <Button variant="contained" color="info" sx={{margin:1}}component="span" >
          select Image
        </Button>
      </label>
      {imageUrl && selectedImage && (
        <Box mt={2} textAlign="center">
         
          <img src={imageUrl} alt={selectedImage.name} height="100px"  style={{borderRadius:'5px'}}/>
        </Box>
      )}
      {err &&  <Alerts text={err} severity="error" /> }
    </Box>
  );
};

