import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import styles from './ArticleList.module.css';
import Tags from './Tags';

export default function ArticleList({ sortBy, appliedFilters }) {
  const { data, error, isLoading, isFetchingMore, fetchMore, canFetchMore } = useQuery(
    ['articleList', sortBy, appliedFilters],
    async () => {
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
          page: 0,
          size: 7,
        },
      });
      return response.data.content;
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.listBox}>
      <ul>
        {data &&
          data.map((adoption) => (
            <li key={adoption.id}>
              <Link to={`/ArticleList/${adoption.adoptionId}`} key={adoption.adoptionId} className={styles.link}>
                <div className={styles.imageContainer}>
                  {adoption.imageUrls ? (
                    <img src={adoption.imageUrls[0]} alt={adoption.title} />
                  ) : (
                    <img src="../../../public/dog.webp" alt="" />
                  )}
                  {adoption.status ? (
                    <div
                      className={
                        adoption.status.value == '분양중'
                          ? styles.statusAdopting
                          : adoption.status.value == '예약중'
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
        {isFetchingMore ? (
          <div className={styles.observer}>Loading more...</div>
        ) : (
          <button
            className={styles.loadMoreButton}
            onClick={() => {
              fetchMore();
            }}
            disabled={!canFetchMore || isFetchingMore}
          >
            {canFetchMore ? 'Load More' : 'No more data'}
          </button>
        )}
      </ul>
    </div>
  );
}

// import React from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { useInfiniteQuery } from 'react-query'; // useInfiniteQuery를 사용합니다.
// import styles from './ArticleList.module.css';
// import Tags from './Tags';

// export default function ArticleList({ sortBy, appliedFilters }) {
//     const { data, error, isLoading, isFetchingMore, fetchMore, canFetchMore } =
//         useInfiniteQuery(
//             ['articleList', sortBy, appliedFilters], // 쿼리 키는 배열 형태로 전달합니다.
//             async ({ pageParam = 0 }) => {
//                 // pageParam을 사용하여 페이지 번호를 전달받습니다.
//                 const response = await axios.get(
//                     'https://server.banzzokee.homes/api/adoptions',
//                     {
//                         params: {
//                             breed: appliedFilters.breed.join(','),
//                             dogSize: appliedFilters.size,
//                             neutering: appliedFilters.neutering,
//                             healthChecked: appliedFilters.healthChecked,
//                             gender: appliedFilters.gender,
//                             minAge: appliedFilters.minAge,
//                             maxAge: appliedFilters.maxAge,
//                             direction: sortBy,
//                             page: pageParam, // pageParam을 사용하여 페이지 번호를 설정합니다.
//                             size: 7,
//                         },
//                     }
//                 );
//                 return response.data.content;
//             },
//             {
//                 getNextPageParam: (lastPage, allPages) => {
//                     // 다음 페이지의 페이지 번호를 반환합니다.
//                     if (lastPage.length < 7) {
//                         return undefined; // 더 이상 데이터가 없는 경우 undefined를 반환합니다.
//                     }
//                     return allPages.length; // 다음 페이지 번호를 반환합니다.
//                 },
//             }
//         );

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error.message}</div>;

//     return (
//         <div className={styles.listBox}>
//             <ul>
//                 {data &&
//                     Array.isArray(data) &&
//                     data.map((page, pageIndex) => (
//                         <React.Fragment key={pageIndex}>
//                             {page.map((adoption) => (
//                                 <li key={adoption.id}>
//                                     <Link
//                                         to={`/ArticleList/${adoption.adoptionId}`}
//                                         key={adoption.adoptionId}
//                                         className={styles.link}
//                                     >
//                                         <div className={styles.imageContainer}>
//                                             {adoption.imageUrls ? (
//                                                 <img
//                                                     src={adoption.imageUrls[0]}
//                                                     alt={adoption.title}
//                                                 />
//                                             ) : (
//                                                 <img
//                                                     src="../../../public/dog.webp"
//                                                     alt=""
//                                                 />
//                                             )}
//                                             <div
//                                                 className={
//                                                     adoption.status.value ===
//                                                     '분양중'
//                                                         ? styles.statusAdopting
//                                                         : adoption.status
//                                                               .value ===
//                                                           '예약중'
//                                                         ? styles.statusReserving
//                                                         : styles.statusFinished
//                                                 }
//                                             >
//                                                 {adoption.status.value}
//                                             </div>
//                                         </div>
//                                         <div className={styles.infoBox}>
//                                             <div className={styles.user}>
//                                                 <div className={styles.name}>
//                                                     {adoption.userNickname.substring(
//                                                         0,
//                                                         15
//                                                     )}
//                                                 </div>
//                                                 <div className={styles.date}>
//                                                     {adoption.createdAt.substring(
//                                                         0,
//                                                         10
//                                                     )}
//                                                 </div>
//                                             </div>
//                                             <div className={styles.title}>
//                                                 {adoption.title}
//                                             </div>
//                                             <div className={styles.tags}>
//                                                 <Tags
//                                                     adoption={adoption}
//                                                 ></Tags>
//                                             </div>
//                                         </div>
//                                     </Link>
//                                 </li>
//                             ))}
//                         </React.Fragment>
//                     ))}
//             </ul>
//             {isFetchingMore ? (
//                 <div className={styles.observer}>Loading more...</div>
//             ) : (
//                 <button
//                     className={styles.loadMoreButton}
//                     onClick={() => fetchMore()}
//                     disabled={!canFetchMore || isFetchingMore}
//                 >
//                     {canFetchMore ? 'Load More' : 'No more data'}
//                 </button>
//             )}
//         </div>
//     );
// }
