import { Star } from 'lucide-react';
import React from 'react';
import { MovieCardProps } from '../types/all';

const MovieCard: React.FC<MovieCardProps> = ({
  posterUrl,
  title,
  releaseDate,
  voteAverage,
  popularity,
  onAddToFavourite,
  buttonTitle,
  Icon,
}) => {
  return (
    <div className=' flex bg-surface dark:bg-darkSurface rounded-md shadow-lg transform transition-all duration-300 hover:scale-[1.02] will-change-transform '>
      {/* Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500${posterUrl}`}
        alt={title}
        className='w-1/3 rounded-md mr-4'
      />

      {/* Text Info */}
      <div className='flex flex-col justify-between w-2/3 py-4 pr-4'>
        <div className='flex flex-col gap-2 '>
          <h2 className='text-xl font-black text-darkSurface dark:text-surface'>{title}</h2>
          <p className='text-sm text-text dark:text-darkText'>
            <strong> Release Date :</strong> {releaseDate}
          </p>
          <p className='text-sm text-text dark:text-darkText'>
            <strong> Popularity :</strong> {popularity.toLocaleString('id-ID')}
          </p>
          <p className='text-sm text-text dark:text-darkText'>
            <Star className='inline mr-1  fill-accent/70 text-accent/70 dark:text-accent dark:fill-accent size-4' />{' '}
            {voteAverage.toFixed(1)}
          </p>
        </div>

        {/* Button Add to Favourite */}
        <button
          onClick={onAddToFavourite}
          className='mt-4 bg-primary hover:bg-darkPrimary text-darkText w-3/4 lg:py-2 lg:px-3 py-1 px-2 self-end rounded-md transition'
        >
          <Icon className='inline mr-2' /> {buttonTitle}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
