import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ChangeStatus.module.css';
import BackHeader from '../../components/common/header/BackHeader';
import { useLocation } from 'react-router-dom';

export default function ChangeStatus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  console.log('changestatus page: state:', state);
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const [newStatus, setNewStatus] = useState('');
  const [isActive, setIsActive] = useState({
    ADOPTING: false,
    RESERVING: false,
    FINISHED: false,
  });
  useEffect(() => {
    const getStatus = async () => {
      try {
        const config = {
          method: 'get',
          url: `https://server.banzzokee.homes/api/adoptions/${id}`,
        };

        const response = await axios.request(config);
        setNewStatus(response.data.status);
        console.log('adoption status', response.data.status);
        setIsActive[
          {
            ...isActive,
            [response.data.status.key]: true,
          }
        ];
        console.log('isactive:::', isActive);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getStatus();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      const config = {
        method: 'patch',
        url: `https://server.banzzokee.homes/api/adoptions/${id}/status`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          status: newStatus,
          assignedUserId: state,
        },
      };

      console.log('Sending data to server:', { status: newStatus });

      const response = await axios.request(config);
      console.log('Server Response:', response.data);
      alert('상태가 변경되었습니다.');
      navigate(`/ArticleList/${id}`);
      console.log(response);
      setIsActive({
        ...isActive,
        [newStatus]: true,
      });
    } catch (error) {
      console.error('Error changing status:', error);
      console.log('Server Error Response:', error.response.data);
    }
  };

  return (
    <div style={{backgroundColor:'#50586c'}}>
      <BackHeader style={{ backgroundColor: '#50586c', border: 'none'}} />
      <div className={styles.statusPage}>
        <div className={styles.container}>
          <h2 style={{color: '#FFFFFF' }}>분양상태 변경</h2>
          <div className={styles.statusBox}>
          {/* <p className={styles.currentStatus}>현재 상태: {newStatus.value}</p> */}
          <div className={styles.statusButton}>
            <button type="button" name="status" onClick={() => handleStatusChange('ADOPTING')} className={styles.statusAdopting}>
              분양중
            </button>
            <button type="button" name="status" onClick={() => handleStatusChange('RESERVING')} className={styles.statusReserving}>
              예약중
            </button>
            <button type="button" name="status" onClick={() => handleStatusChange('FINISHED')} className={styles.statusFinished}>
              분양완료
            </button>
            </div>
            </div>
          </div>
      </div>
    </div>
  );
}
