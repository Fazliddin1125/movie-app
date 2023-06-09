import React, { useRef, useState } from 'react'
import { RowProps } from './row.props'
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai"
import Thumbnail from '../thumbnail/thumbnail'

function Row({ title, movies, isBig=false }: RowProps) {
  const [moved, setMoved] = useState<boolean>(false);
  const caruselRef = useRef<HTMLDivElement>(null);
  const handleClick = (direction: 'left' | 'right')=>{
    setMoved(true);
    if(caruselRef.current){
      const {clientWidth, scrollLeft}=caruselRef.current

      const scrollTo = direction === 'left' ? scrollLeft-clientWidth : scrollLeft + clientWidth;
      const scrollRi = direction === 'right' ? scrollLeft+clientWidth : scrollLeft - clientWidth;
      
      
      caruselRef.current.scrollTo({left: scrollTo, behavior: "smooth"})

      if(direction === 'left' && scrollTo <= 0){
        setMoved(false)
      }
      
  };}


  return (
    <div className='h-[600px] space-y-1 md:space-y-2' >
      <h2 className='w-56 cursor-pointer md:text-2xl  text-[#e5e5e5] hover:text-white transition duration-200 font-bold' >{title}</h2>
      {/* {Carusel} */}
      <div className='group relative mg:ml-2' >
        <AiFillCaretLeft 
        onClick={()=>handleClick('left')}
        className={` ${!moved && "hidden"} absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 group-hover:opacity-100 transition duration-200 hover:scale-125`} />
        
        <div ref={caruselRef} className={`flex items-center ${!isBig && 'space-x-1 md:space-x-4 '} overflow-x-scroll scrollbar-hide overflow-hidden`} >
          {movies.map(movie => (
            <Thumbnail key={movie.id} movie={movie} isBig={isBig}/>
          ))}
        </div>
        <AiFillCaretRight
         onClick={()=>handleClick('right')} 
         className={` absolute top-0 bottom-0 right-2  opacity-0 z-40 m-auto h-9 w-9 cursor-pointer  group-hover:opacity-100 transition duration-200 hover:scale-125`} />
      </div>
    </div>
  )
}

export default Row