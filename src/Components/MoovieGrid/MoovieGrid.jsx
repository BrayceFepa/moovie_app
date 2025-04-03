import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tmbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import Button, { OutlineButton } from '../Button/Button';
import MovieCard from '../MovieCard/MovieCard';
import Input from '../Input/Input';

import './MoovieGrid.scss';
import Swal from 'sweetalert2';

const MoovieGrid = props => {

    const [items, setItems] = useState([]);

    const [page, setPage] = useState(1);

    const [totalPage, setTotalPage] = useState(0);

    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            let response = null;

            if (keyword === undefined) {
                const params = {};

                switch (props.category) {
                    case category.movie:
                        response = await tmbApi.getMovieList(movieType.upcoming, { params });
                        break;
                    default:
                        response = await tmbApi.getTvList(tvType.popular, { params });
                }
            } else {
                const params = { query: keyword };
                response = await tmbApi.search(props.category, { params });
            }

            setItems(response.results);
            setTotalPage(response.total_pages);

        }
        getList();
    }, [props.category, keyword]);

    const loadMore = async () => {
         let response = null;

            if (keyword === undefined) {
                const params = {page: page + 1};

                switch (props.category) {
                    case category.movie:
                        response = await tmbApi.getMovieList(movieType.upcoming, { params });
                        break;
                    default:
                        response = await tmbApi.getTvList(tvType.popular, { params });
                }
            } else {
                const params = { page: page + 1, query: keyword };
                response = await tmbApi.search(props.category, { params });
            }

            setItems([...items, ...response.results]);
            setPage(page + 1);
    }

  return (
      <>
          <div className="section mb-3">
              <MovieSearch category={props.category} keyword={keyword} />
          </div>
          
        <div className='movie-grid' >
          {items.map((item, i)=> <MovieCard category={props.category} item={item} key={i} /> )}
          </div>
          {
              page < totalPage ? (
                  <div className="movie-grid__loadmore">
                      <OutlineButton className="small" onClick={loadMore} >Load More</OutlineButton>
                  </div>
              ): null
          }
      </>
  )
}

const MovieSearch = props => {

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(
        () => {
            if (props.category && category[props.category]) {
                if (keyword.trim().length > 0) {
                navigate(`/${category[props.category]}/search/${keyword}`);
            }
            } else {
                console.log("hello")
                Swal.fire({
                    title: "Select Category (Movies or Tv Series)",
                    icon:"error",
                })
            }
            
        },
        [keyword, props.category, navigate]
    );

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }

        document.addEventListener('keyup', enterEvent);

        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch])

    return (
        <div className="movie-search">
            <Input
                type='text'
                placeholder='Enter keyword'
                value={keyword}
                onChange={(e)=> setKeyword(e.target.value)}
            />
            <Button className='small' onClick={goToSearch} >Search</Button>
        </div>
    )
}

export default MoovieGrid;