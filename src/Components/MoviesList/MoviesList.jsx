import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import './MoviesList.scss';

import { SwiperSlide, Swiper } from 'swiper/react';
import { Link } from 'react-router-dom';

import Button from '../Button/Button';

import tmbApi, { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import MovieCard from '../MovieCard/MovieCard';

const MoviesList = props => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        response = await tmbApi.getMovieList(props.type, { params });
                        break;
                    default:
                        response = await tmbApi.getTvList(props.type, { params });
                }
            } else {
                response = await tmbApi.similar(props.category, props.id);
            };

            setItems(response.results);
        }

        getList();
    }, [])

  return (
      <div className='movie-list' >
          <Swiper
              grabCursor={true}
              spaceBetween={10}
              slidesPerView={'auto'}
          >
              {
                  items.map((item, i) => (
                      <SwiperSlide key={i} >
                          <MovieCard item={item} category={props.category} />
                      </SwiperSlide>
                  ))
              }
          </Swiper>
    </div>
  )
}

MoviesList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}

export default MoviesList;