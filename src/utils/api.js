'use strict';

const API_ADDRESS =
  'https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete';

export const requestKeyword = async (keyword) => {
  if (sessionStorage.getItem(`result_${keyword}`)) {
    return JSON.parse(sessionStorage.getItem(`result_${keyword}`));
  } else {
    const response = await fetch(`${API_ADDRESS}?value=${keyword}`);

    if (response.ok) {
      const json = await response.json();
      sessionStorage.setItem(`result_${keyword}`, JSON.stringify(json));
    } else {
      throw Error('API 연결에 실패했습니다');
    }

    return JSON.parse(sessionStorage.getItem(`result_${keyword}`));
  }
};
