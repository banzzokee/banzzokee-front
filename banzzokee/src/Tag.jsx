import { useState } from 'react';
import styles from './Tag.module.css';

export default function Tag({ onChange }) {
  const [breeds, setBreeds] = useState([
    "시베리안 허스키",
    "푸들",
    "셰퍼드",
  ]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectAge, setSelectAge] = useState('나이');
  const selectList = [
    { value: "default", name: '선택'},
    { value: 'month', name: '개월'},
    { value: 'year', name: '살'},
  ];

  // button active style
  const [isActive, setIsActive] = useState({
    size: '',
    healthChecked: '',
    gender: '',
    neutering: '',
  });

  const selectStyle = {
    backgroundColor: '#B7E017',
  };

  // 견종
  const handleBreed = (breed) => {
    setSelectedBreed(breed);
    onChange({ target: { name: 'breed', value: breed } });
  };

  const handleTagClick = (tagName, tagValue) => {
    setIsActive({
      ...isActive,
      [tagName]: tagValue,
    });

    onChange({ target: { name: `tag_${tagName}`, value: tagValue } });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBreeds = breeds.filter((breed) =>
    breed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 나이
  const handleAge = (e) => {
    setSelectAge(e.target.value);
  
    const ageValue = e.target.value === 'default' ? '' : `${e.target.value} ${selectAge}`;
    onChange({ target: { name: 'tag_age', value: ageValue } });
  };

  //유기견등록날짜
  const [date, setDate] = useState('');
  const format = 'YYYY-MM-DD';

  const getSeparator = () => {
    const regex = /[^0-9a-zA-Z]+/;
    const match = format.match(regex);

    if (match) {
      const symbol = match[0];
      const indexes = [];

      for (let i = 0; i < format.length; i++) {
        if (format[i] === symbol) {
          indexes.push(i);
        }
      }

      return { symbol, indexes };
    }
    return { symbol: undefined, indexes: [] };
  };

  const separator = getSeparator();
  
  const handleChangeDate = (e) => {
    let currentDate = e.target.value;
    currentDate = currentDate.replace(/[^0-9]/g, '');
    if (currentDate.length >= 6) {
      currentDate = `${currentDate.slice(0, 4)}-${currentDate.slice(4, 6)}-${currentDate.slice(6, 8)}`;
    } else if (currentDate.length >= 4) {
      currentDate = `${currentDate.slice(0, 4)}-${currentDate.slice(4)}`;
    }

    setDate(currentDate);
  };

  return (
    <div className={styles.tag_container}>
      <label className={styles.label}>태그</label>
      <div className={styles.tag_box}>
        <div className={styles.tag_item}>
          <label>견종</label>
          <div className={styles.searchBreed}>
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="견종을 검색하세요"
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.inputBreed}
              />
              <div className={styles.breedList}>
                {searchQuery &&
                  filteredBreeds.map((breed) => (
                    <div key={breed} onClick={() => handleBreed(breed)}>
                      {breed}
                    </div>
                  ))}
              </div>
            </div>
            <input type='text' value={selectedBreed} readOnly className={styles.breedSelected} />
          </div>
        </div>
        <div className={styles.tag_item}>
          <label>사이즈</label>
          <button type="button" name='size' onClick={() => handleTagClick('size', '초소')} style={isActive.size === '초소' ? { ...selectStyle } : {}}>초소</button>
          <button type="button" name='size' onClick={() => handleTagClick('size', '소')} style={isActive.size === '소' ? { ...selectStyle } : {}}>소</button>
          <button type="button" name='size' onClick={() => handleTagClick('size', '중')} style={isActive.size === '중' ? { ...selectStyle } : {}}>중</button>
          <button type="button" name='size' onClick={() => handleTagClick('size', '대')} style={isActive.size === '대' ? { ...selectStyle } : {}}>대</button>
        </div>
        <div className={styles.tag_item}>
          <label>건강검진</label>
          <button type="button" name='healthChecked' onClick={() => handleTagClick('healthChecked', '검진 완료')} style={isActive.healthChecked === '검진 완료' ? { ...selectStyle } : {}}>검진 완료</button>
          <button type="button" name='healthChecked' onClick={() => handleTagClick('healthChecked', '검진 미완료')} style={isActive.healthChecked === '검진 미완료' ? { ...selectStyle } : {}}>검진 미완료</button>
        </div>
        <div className={styles.tag_item}>
          <label>성별</label>
          <button type="button" name='gender' onClick={() => handleTagClick('gender', '남')} style={isActive.gender === '남' ? { ...selectStyle } : {}}><img src='../../../public/Male.svg' alt="Male" /></button>
          <button type="button" name='gender' onClick={() => handleTagClick('gender', '여')} style={isActive.gender === '여' ? { ...selectStyle } : {}}><img src='../../../public/Female.svg' alt="Female" /></button>
        </div>
        <div className={styles.tag_item}> 
          <label>중성화</label>
          <button type="button" name='neutering' onClick={() => handleTagClick('neutering', '예')} style={isActive.neutering === '예' ? { ...selectStyle } : {}}>예</button>
          <button type="button" name='neutering' onClick={() => handleTagClick('neutering', '아니오')} style={isActive.neutering === '아니오' ? { ...selectStyle } : {}}>아니오</button>
        </div>
        <div className={styles.tag_item}>
          <label>나이</label>
          <input name='tag_age' onChange={onChange} className={styles.inputAge}></input>
          <select className={styles.select} onChange={handleAge} value={selectAge}>
            {selectList.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.tag_item}>
          <div className={styles.date}>
            <span>유기견</span>
            <span>등록날짜</span>
          </div>
          <input type='text' value={date} name='tag_registeredAt' onChange={handleChangeDate} placeholder='YYYY-MM-DD' className={styles.inputDate}></input>
        </div>
      </div>
    </div>
  );
}