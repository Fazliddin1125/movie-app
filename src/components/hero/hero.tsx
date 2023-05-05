import { HeroProps } from "./hero.props"
import { useState, useEffect } from 'react'
import { IMovie } from "src/interfaces/app.interface"
import Image from "next/image"
import { image_base } from "../helpers/constants"
import ReactStars from 'react-stars'
import { useInfoStore } from "src/store"
import { FaPlay } from "react-icons/fa"

const Hero = ({ trending }: HeroProps): JSX.Element => {
 const [movie, setMovie] = useState<IMovie>({} as IMovie)     
 const {setModal, setCurrentMovie} = useInfoStore()



 useEffect(() => {
    const randomMovie = trending[Math.floor(Math.random() * trending.length)]  
    
    setMovie(randomMovie);
 }, [trending])

 const handleCurrentMovie = () =>{
    setModal(true);
    setCurrentMovie(movie)
}
 
  return (
    <div className="flex flex-col px-8 space-y-8 pt-16 md:space-y-4 lg:h-[65vh] lg:pb-12 lg:justify-end" >
       
        
        <div className="absolute -z-10 top-0 left-0 h-[95vh] w-full" >
            <Image src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`} alt={movie?.title} fill className="object-cover" />
        </div>
    
        
        <div  className="py-[4px] px-[8x] text-center rounded-bl-[8px] rounded-tr-[8px] bg-[#1d1d1d]/50 w-[111px]">
            {movie.media_type}
        </div>

        <div className="flex items-center space-x-2 ">
           <ReactStars edit={false} color2={'white'} size={30} count={10} value={movie.vote_average}/> 
           <p>({movie.vote_count})</p>
        </div>

        <h1 className="text-2xl  font-bold md:text-4xl lg:text-7xl" >
            {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className="max-w-xs md:max-w-lg lg:max-w-2xl text-xs md:text-lg lg:text-2xl" >{movie?.overview?.slice(0,100)}...</p>
        <div>
            <button onClick={()=> {handleCurrentMovie()}} className=" bg-white/40 text-black font-bold py-4 px-8 flex rounded-full items-center justify-center w-[200px] h-[56px]" > <FaPlay  className="  mx-2 " /> Watch now</button>
        </div>
        
    </div>
  )
}

export default Hero