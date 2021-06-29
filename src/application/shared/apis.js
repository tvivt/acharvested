import axios from 'axios';

const baseHost = process.env.NODE_ENV === 'development' ? '' : 'https://airdrop.acharvested.me';

export const fetchTotalByServerless = () => {
  const url = `${baseHost}/api/total`;
  return axios({
    url
  });
}

export const fetchNonceByServerless = () => {
  const url = `${baseHost}/api/nonce`;
  return axios({
    url
  });
}

export const fetchVerifyResultByServerless = (nonce, sign, address) => {
  const url = `${baseHost}/api/verify`;
  return axios({
    url,
    params: {
      nonce,
      sign,
      address
    }
  });
}

export const fetchArchived = (nonce, sign, address, page) => {
  const url = `${baseHost}/api/archived`;
  return axios({
    url,
    params: {
      nonce,
      sign,
      address,
      page
    }
  })
}