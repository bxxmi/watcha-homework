const API_ADDRESS =
  'https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete';

export const requestKeyword = async (keyword) => {
  try {
    const response = await (
      await fetch(`${API_ADDRESS}?value=${keyword}`)
    ).json();

    return response;
  } catch (e) {
    console.error(e);
  }
};
