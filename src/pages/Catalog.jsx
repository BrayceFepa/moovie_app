import React from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../Components/page-header/PageHeader';

import { category as cate } from '../api/tmdbApi';
import MoovieGrid from '../Components/MoovieGrid/MoovieGrid';

const Catalog = () => {

  const { category } = useParams();
  

  return (
    <>
      <PageHeader>
        {category === cate.movie ? 'Movies': 'TV Series'}
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MoovieGrid category={category}  />
        </div>
      </div>
    </>
  )
}

export default Catalog