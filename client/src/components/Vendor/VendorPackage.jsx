
import ModalVendor from "./Modal/ModalVendor"
import NavbarVendor from "./NavbarVendor./NavbarVendor"
import resort from '.././User/assets/resort1.jpg'



function VendorPackage(){

 

    return(
        <>
        <NavbarVendor />
        <ModalVendor />
        <div className="card lg:card-side bg-base-100">
        <figure><img src=" " alt=" "/></figure>
        <div className="card-body">
          <h2 className="card-title">New album is released!</h2>
          <p>Click the button to listen on Spotiwhy app.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
      </div>
      </>
    )
}

export default VendorPackage