import { useState } from 'react';
import resort from '.././User/assets/resort1.jpg'
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../../Services/vendorApi';
import NavbarVendor from './NavbarVendor./NavbarVendor';
import { toast } from 'react-toastify';


function VendorWelcome(){

    const [selectedImages, setSelectedImages] = useState([]);
    const navigate = useNavigate();
  
    const isValidFileUploaded = (file) => {
      const validExtensions = ['jpg', 'png', 'jpeg', 'gif','webp'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      return validExtensions.includes(fileExtension);
    };
  
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
    };
  
    const handleSubmit = async () => {
        try {
            const {data} = await uploadImage(selectedImages)
            console.log(data)
            if (data.success) {
              toast.success(data.message, {
                  position: "top-center"
              })
              navigate("/vendor/home")

          } else if(data.error) {
              toast.error(data.message, {
                  position: "top-center"
              })
          }
          } catch (error) {
            console.log(error);
        }
    };
  
    const handleFileChange = (e) => {
      const files = e.target.files;
      const imageList = Array.from(files);
      const isValidImages = imageList.every((file) => isValidFileUploaded(file));
  
      if (isValidImages) {
        Promise.all(imageList.map(convertToBase64))
          .then((base64Images) => setSelectedImages(base64Images))
          .catch((error) => console.log('Error converting images to base64:', error));
      } else {
        console.log('Invalid File type');
      }
    };


    return(
        <>
        <NavbarVendor />
        <div className=" flex justify-center h-screen items-center  mb-11">
      <div className="card glass w-7/12 h-3/4 shadow-xl">
        <figure >
          <img src={resort} alt="Shoes" className="rounded-xl w-72" />
        </figure>
        <div className="card-body items-center mb- text-center">
          <h1 className="card-title text-3xl ">Welcome Aboard..</h1>
          <p>Update Your Resort Images</p>
          <input
            type="file"
            className="file-input file-input-ghost w-full mt-7 mb-10 max-w-xs"
           onChange={handleFileChange}
            multiple
          />
          <button className="btn btn-outline btn-accent" onClick={handleSubmit}>Upload</button>
        </div>
      </div>
    </div>
    </>
  );
};
 

export default VendorWelcome