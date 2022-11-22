const API_END_POINT = `http://www.litriggy.com:7777/api/v1`;

export const request = async (url, options={}) => {
  const $modal = document.querySelector('#modal');
  
  try {
    $modal.style.display = 'flex';
    const fullUrl = `${API_END_POINT}${url}`;
    const response = await fetch(fullUrl, options);

    if(response.ok) {
      const json = await response.json();
      return json;
    }
    
    throw new Error(`API 호출 오류`);
  }catch(e){
    throw new Error(`API 호출 오류 :`, e);
  } finally {
    $modal.style.display = 'none';
  }
}