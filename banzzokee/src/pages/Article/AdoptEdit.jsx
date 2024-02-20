import axios from "axios";
import React,{ useEffect, useState } from "react"
import styles from './AdoptEdit.module.css'
import Tag from '../../Tag';
import BackHeader from "../../components/common/header/BackHeader";
import { useNavigate, useParams } from "react-router-dom"

export default function ArticleUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [adoption, setAdoption] = useState({
    id: 0,
    imageUrls: [],
    title: '',
    tags: {
      breeds:'',
      size:'',
      healthChecked:'',
      gender:'',
      neutering:'',
      age:'',
      registeredAt:'',
    },
    status:'',
    content: '',
  });

  const [isActive, setIsActive] = useState({
    ongoing: false,
    booking: false,
    completion: false,
  });

  const { title, content, tags, status, imageUrls } = adoption;

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === 'image') {
      setAdoption({
        ...adoption,
        [name]: e.target.files,
      });
    } else if (name.includes('tag_')) {
      const tagButton = name.replace('tag_', '');
      setAdoption({
        ...adoption,
        tags: {
          ...tags,
          [tagButton]: value,
        },
      });
    } else if (name === 'breed') {
      setAdoption({
        ...adoption,
        tags: {
          ...tags,
          breeds: value, 
        },
      });
    } else {
      setAdoption({
        ...adoption,
        [name]: value,
      });
    }
  };

  const handleStatus = (status) => {
    setAdoption({
      ...adoption,
      status,
    });

    setIsActive({
      ongoing: status === '분양중',
      booking: status === '예약중',
      completion: status === '분양완료',
    });
  };

  useEffect(() => {
    const getAdoption = async () => {
      try {
        const config = {
          method: 'get',
          url: `https://server.banzzokee.homes/api/adoptions/${id}`,
        };
  
        const response = await axios.request(config);
        setAdoption(response.data);
        console.log('adoption', adoption);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getAdoption();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3001/adoption/${id}`, adoption).then((res) => {
      alert('수정되었습니다.');
      navigate(`/ArticleList/${id}`)
    })
  }

  return (
    <div className={styles.CreateAdoptPage}>
      <BackHeader style={{backgroundColor:"#FFFFFF", border:"none"}} />
      <div className={styles.create_Page}>
        <h2 className={styles.adopt_Title}>분양 구하기 게시글</h2>

        {/* 스크롤 시작되는 부분 */}
        <form style={{ overflowY: 'scroll', maxHeight: '800px' }} className={styles.container}>
          <div className={styles.inputGroup}>
            <label>
              <p>사진</p>
              <p>(최대 8장)</p>
            </label>
            <input type="file" multiple accept="image/*" name="image" className={styles.img_upload} onChange={onChange}></input>
          </div>
          <div className={styles.inputGroup}>
            <label>제목</label>
            <input type='text' name='title' value={adoption.title} onChange={onChange} className={styles.input} placeholder='50자 이내로 작성해주세요.' maxLength='50'></input>
          </div>
          <div className={styles.inputGroup}>
            <Tag onChange={onChange} />
          </div>
          <div className={styles.inputGroup}>
            <label>상태</label>
            <div className={styles.stateBox}>
              <button type='button' name='status' value='분양중' onClick={() => handleStatus('분양중')} style={isActive.ongoing ? { backgroundColor: '#FFEE55' } : {}} className={styles.ongoing}>분양중</button>
              <button type='button' name='status' value='예약중' onClick={() => handleStatus('예약중')} style={isActive.booking ? { backgroundColor: '#FFB155' } : {}} className={styles.booking}>예약중</button>
              <button type='button' name='status' value='분양완료' onClick={() => handleStatus('분양완료')} style={isActive.completion ? { backgroundColor: '#79C7DF' } : {}} className={styles.completion}>분양완료</button>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.textTitle}>본문</label>
            <textarea name='content' value={adoption.content} onChange={onChange} placeholder='500자 이내로 작성해주세요.' maxLength='500'></textarea>
          </div>
          <button onClick={handleEdit} className={styles.button}>게시글 수정</button>
        </form>
      </div>
    </div>
  );
}