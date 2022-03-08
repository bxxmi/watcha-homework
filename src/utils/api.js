const API_ADDRESS =
  'https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete';

export const requestKeyword = async (keyword) => {
  if (sessionStorage.getItem(`result_${keyword}`)) {
    return JSON.parse(sessionStorage.getItem(`result_${keyword}`));
  } else {
    try {
      const response = await fetch(`${API_ADDRESS}?value=${keyword}`);
      const json = await response.json();

      sessionStorage.setItem(`result_${keyword}`, JSON.stringify(json));

      return JSON.parse(sessionStorage.getItem(`result_${keyword}`));
    } catch (error) {
      console.log(error);
    }
  }
};
