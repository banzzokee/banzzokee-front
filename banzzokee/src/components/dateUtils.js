export function notificationDate(dateTimeString) {
  const date = new Date(dateTimeString);
  const currentDate = new Date();

  const diffInMilliseconds = currentDate - date;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInMinutes < 1) {
    return `${diffInSeconds}초 전`;
  } else if (diffInHours < 1) {
    return `${diffInMinutes}분 전`;
  } else if (date.getDate() === currentDate.getDate()) {
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  } else if (date.getDate() === currentDate.getDate() - 1) {
    return `어제 ${date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}`;
  } else if (date.getDate() > currentDate.getDate() - 7) {
    return `${weekdayNames[date.getDay()]} ${date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }) +
      date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  }
}

const weekdayNames = ['일', '월', '화', '수', '목', '금', '토'];
