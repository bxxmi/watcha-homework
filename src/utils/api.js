const API_ADDRESS =
  'https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete';

export const requestKeyword = async (keyword) => {
  console.log(keyword);
  const response = await (
    await fetch(`${API_ADDRESS}?value=${keyword}`)
  ).json();

  if (response.length === 0) console.log('일치하는 결과가 없습니다.');

  console.log(response);
};
