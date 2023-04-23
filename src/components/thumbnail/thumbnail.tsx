import Image from 'next/image'
import React from 'react'
import { image_base } from '../helpers/constants'
import { ThumbnailProps } from './thumbnail.props'
import ReactStars from 'react-stars'
import { useInfoStore } from "src/store"

function Thumbnail({ movie, isBig = false}: ThumbnailProps) {
  const {setModal, setCurrentMovie} = useInfoStore()
  const handleCurrentMovie = () =>{
    setModal(true);
    setCurrentMovie(movie)
}

  return (
    <div onClick={handleCurrentMovie} className={`relative ${
      isBig ? 'h-[400px] md:h-[500px] min-w-[480px] md:min-w-[500px]' : 'h-[330px] md:h-[440px] min-w-[200px] md:min-w-[292px]'
    }  cursor-pointer transition duration-200 ease-out md:hover:scale-110`}>
      <Image src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`} alt={movie?.title} fill className="object-cover rounded-sm md:rounded" />


      <div className='absolute left-0 right-0 bottom-0 w-full h-full bg-black/40' ></div>

      <div className='absolute bottom-5 left-4 right-2'>
      
        <div className="flex items-center space-x-2 ">
          <ReactStars edit={false} color2={'#fff'} size={10} count={10} value={movie.vote_average} />
          <p>({movie.vote_count})</p>
        </div>
      
        <h1 className="text-xl  font-bold md:text-2xl" >
            {movie?.title || movie?.name || movie?.original_name}
        </h1>
      
      </div>
    </div>
  )
}

export default Thumbnail