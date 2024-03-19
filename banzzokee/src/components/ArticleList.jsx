import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import styles from './ArticleList.module.css';
import Tags from './Tags';

export default function ArticleList({ sortBy, appliedFilters }) {
  const fetchArticles = async ({ pageParam = 0 }) => {
    const response = await axios.get('https://server.banzzokee.homes/api/adoptions', {
      params: {
        breed: appliedFilters.breed.join(','),
        dogSize: appliedFilters.size,
        neutering: appliedFilters.neutering,
        healthChecked: appliedFilters.healthChecked,
        gender: appliedFilters.gender,
        minAge: appliedFilters.minAge,
        maxAge: appliedFilters.maxAge,
        direction: `${sortBy}`,
        page: pageParam,
        size: 7,
      },
    });
    return response.data.content;
  };

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError } = useInfiniteQuery(
    ['articleList', sortBy, appliedFilters],
    fetchArticles,
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length === 7 ? pages.length : undefined;
      },
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  return (
    <div className={styles.listBox}>
      <ul>
        {data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.map((adoption) => (
              <li key={adoption.id}>
                <Link to={`/ArticleList/${adoption.adoptionId}`} className={styles.link}>
                  <div className={styles.imageContainer}>
                    {adoption.imageUrls ? (
                      <img src={adoption.imageUrls[0]} alt={adoption.title} />
                    ) : (
                      <img src="../../../public/dog.webp" alt="" />
                    )}
                    {adoption.status ? (
                      <div
                        className={
                          adoption.status.value === '분양중'
                            ? styles.statusAdopting
                            : adoption.status.value === '예약중'
                            ? styles.statusReserving
                            : styles.statusFinished
                        }
                      >
                        {adoption.status.value}
                      </div>
                    ) : (
                      <div className={styles.status}>loading</div>
                    )}
                  </div>
                  <div className={styles.infoBox}>
                    <div className={styles.user}>
                      <div className={styles.name}>{adoption.userNickname.substring(0, 15)}</div>
                      <div className={styles.date}>{adoption.createdAt.substring(0, 10)}</div>
                    </div>
                    <div className={styles.title}>{adoption.title}</div>
                    <div className={styles.tags}>
                      <Tags adoption={adoption}></Tags>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      {isFetching ? (
        <div className={styles.observer}>Loading more...</div>
      ) : (
        hasNextPage && (
          <button className={styles.loadMoreButton} onClick={() => fetchNextPage()} disabled={isFetching}>
            {isFetching ? 'Loading...' : 'Load More'}
          </button>
        )
      )}
    </div>
  );
}
