import { useState } from 'react';
import styles from './Tag.module.css';

export default function Tag({ onChange }) {
  const [breeds, setBreeds] = useState(['시베리안 허스키', '푸들', '셰퍼드', '알래스카 맬러뮤트', '도베르만', '리트리버', '베들링턴 테리어', '그레이하운드', '웰시코기', '사모예드', '시바', '스피츠', '슈나우저', '비숑', '시츄', '잭 러셀 테리어', '포메라니안', '핀셔', '파피용', '요크셔 테리어', '말티즈', '닥스훈트', '치와와', '퍼그', '불독', '믹스', '기타']);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectAge, setSelectAge] = useState('나이');
  const selectList = [
    { value: 'default', name: '선택' },
    { value: 'month', name: '개월' },
    { value: 'year', name: '살' },
  ];

  const breedEnglish = {
    '시베리안 허스키': 'SIBERIAN_HUSKY',
    푸들: 'POODLE',
    셰퍼드: 'SHEPHERD',
    '알래스카 맬러뮤트': 'ALASKAN_MALAMUTE',
    도베르만: 'DOBERMAN',
    리트리버: 'RETRIEVER',
    '베들링턴 테리어': 'BEDLINGTON_TERRIER',
    그레이하운드: 'GREYHOUND',
    웰시코기: 'WELSH_CORGI',
    사모예드: 'SAMOYED',
    시바: 'SHIBA_INU',
    스피츠: 'SPITZ',
    슈나우저: 'SCHNAUZER',
    비숑: 'BICHON',
    시츄: 'SHIHTZU',
    '잭 러셀 테리어': 'JACK_RUSSELL_TERRIOR',
    포메라니안: 'POMERANIAN',
    핀셔: 'PINSCHER',
    파피용: 'PAPILON',
    '요크셔 테리어': 'YORKSHIRE_TERRIER',
    말티즈: 'MALTESE',
    닥스훈트: 'DACHSHUND',
    치와와: 'CHIHUAHUA',
    퍼그: 'PUG',
    불독: 'BULLDOG',
    믹스: 'MIX',
    기타: 'ETC',
  };

  // button active style
  const [isActive, setIsActive] = useState({
    size: '',
    healthChecked: '',
    gender: '',
    neutering: '',
  });

  const selectStyle = {
    backgroundColor: '#9aaee057',
  };

  // 견종
  const handleBreed = (breed) => {
    setSelectedBreed(breed);

    onChange({ target: { name: 'breed', value: breedEnglish[breed] } });
    console.log(breedEnglish[breed]);
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

  const filteredBreeds = breeds.filter((breed) => breed.toLowerCase().includes(searchQuery.toLowerCase()));

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
    onChange({ target: { name: 'tag_registeredAt', value: currentDate } });
    console.log(date);
    console.log('current', currentDate);
  };

  return (
    <div className={styles.tag_container}>
      <div className={styles.label}>태그</div>
      <div className={styles.tag_box}>
        <div className={styles.tag_item}>
          <label className={styles.taglabel}>견종</label>
          <div className={styles.searchBreed}>
            <div className={styles.searchBox}>
              <input type="text" placeholder="견종을 검색하세요" value={searchQuery} onChange={handleSearchChange} className={styles.inputBreed} />
              <div className={`${styles.breedList} ${selectedBreed ? styles.breedListHidden : ''}`}>
                {searchQuery &&
                  filteredBreeds.map((breed) => (
                    <div key={breed} onClick={() => handleBreed(breed)}>
                      {breed}
                    </div>
                  ))}
              </div>
            </div>
            <input type="text" value={selectedBreed} readOnly className={`${styles.breedSelected} ${selectedBreed ? styles.breedSelectedVisible : ''}`} />
          </div>
        </div>
        <div className={styles.tag_item}>
          <label className={styles.taglabel}>사이즈</label>
          <button className={styles.sizeButton} type="button" name="size" onClick={() => handleTagClick('size', 'ULTRA_SMALL')} style={isActive.size === 'ULTRA_SMALL' ? { ...selectStyle } : {}}>
            초소
          </button>
          <button className={styles.sizeButton} type="button" name="size" onClick={() => handleTagClick('size', 'SMALL')} style={isActive.size === 'SMALL' ? { ...selectStyle } : {}}>
            소
          </button>
          <button className={styles.sizeButton} type="button" name="size" onClick={() => handleTagClick('size', 'MEDIUM')} style={isActive.size === 'MEDIUM' ? { ...selectStyle } : {}}>
            중
          </button>
          <button className={styles.sizeButton} type="button" name="size" onClick={() => handleTagClick('size', 'LARGE')} style={isActive.size === 'LARGE' ? { ...selectStyle } : {}}>
            대
          </button>
        </div>
        <div className={styles.tag_item}>
          <label className={styles.taglabel}>건강검진</label>
          <button type="button" name="healthChecked" onClick={() => handleTagClick('healthChecked', true)} style={isActive.healthChecked === true ? { ...selectStyle } : {}}>
            검진 완료
          </button>
          <button type="button" name="healthChecked" onClick={() => handleTagClick('healthChecked', false)} style={isActive.healthChecked === false ? { ...selectStyle } : {}}>
            검진 미완료
          </button>
        </div>
        <div className={styles.tag_item}>
          <label className={styles.taglabel}>성별</label>
          <button type="button" name="gender" onClick={() => handleTagClick('gender', 'MALE')} style={isActive.gender === 'MALE' ? { ...selectStyle } : {}}>
            <img src="../../../public/Male.svg" alt="Male" />
          </button>
          <button type="button" name="gender" onClick={() => handleTagClick('gender', 'FEMALE')} style={isActive.gender === 'FEMALE' ? { ...selectStyle } : {}}>
            <img src="../../../public/Female.svg" alt="Female" />
          </button>
        </div>
        <div className={styles.tag_item}>
          <label className={styles.taglabel}>중성화</label>
          <button type="button" name="neutering" onClick={() => handleTagClick('neutering', true)} style={isActive.neutering === true ? { ...selectStyle } : {}}>
            예
          </button>
          <button type="button" name="neutering" onClick={() => handleTagClick('neutering', false)} style={isActive.neutering === false ? { ...selectStyle } : {}}>
            아니오
          </button>
        </div>
        <div className={styles.tag_item}>
          <label className={styles.taglabel}>나이</label>
          <input name="tag_age" onChange={onChange} className={styles.inputAge}></input>살
          {/* <select className={styles.select} onChange={handleAge} value={selectAge}>
            {selectList.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </select> */}
        </div>
        <div className={styles.tag_item}>
          <label className={styles.taglabel}>유기견 등록일</label>

          <input type="text" value={date} name="tag_registeredAt" onChange={handleChangeDate} placeholder="YYYY-MM-DD" className={styles.inputDate}></input>
        </div>
      </div>
    </div>
  );
}
