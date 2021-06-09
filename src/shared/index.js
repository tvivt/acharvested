import axios from 'axios';

// 1 未安装 metamask https://metamask.io/
// 2 拒绝签名

export const metamaskUrl = 'https://metamask.io/';

export const createSign = (nonce, address) => {
  return new Promise((resolve, reject) => {
    if (typeof window.ethereum !== 'undefined'){
      const msg = `0x${Buffer.from(nonce, 'utf8').toString('hex')}`;
      window.ethereum.request({
        method: 'personal_sign',
        params: [msg, address]
      }).then((s) => {
        resolve(s);
      }).catch(() => {
        reject(2);
      });
    } else {
      reject(1)
    }
  });
}

const baseHost = process.env.NODE_ENV === 'development' ? '' : 'https://airdrop.acharvested.me';

export const getTotal = () => {
  const url = `${baseHost}/api/total`;
  return axios({
    url
  });
}

export const getNonce = () => {
  const url = `${baseHost}/api/nonce`;
  return axios({
    url
  });
}

export const verify = (nonce, sign, address) => {
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