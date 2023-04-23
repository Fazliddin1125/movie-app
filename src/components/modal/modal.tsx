import  MuiModal  from "@mui/material/Modal" 
import { useInfoStore } from "src/store"
import {FaTimes} from "react-icons/fa"
const Modal = () => {
    const { modal, setModal, currentMovie } = useInfoStore()
    const handleClose =()=>{
        setModal(false);
    }

  return (
    <MuiModal open={modal} onClose={handleClose}>
        <>
         {currentMovie.title} <p>Salom</p>
         <button onClick={()=>setModal(false)} className="modalButton absolute w-9 h-9 right-5 top-5 !z-40 border-none bg-[#181818]" > <FaTimes /></button>
        </>
    </MuiModal>
  )
}

export default Modal