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

function fill(number, length) {
  const filler = '00000';
  let str = number.toString();

  if (str.length < length) {
    str = filler.substring(0, length - str.length) + str;
  }

  return str;
}


export function createUnique() {
  const now = new Date();
  const env = process.env.TARO_ENV;
  return (
    env +
    '-' +
    now.getFullYear() +
    fill(now.getMonth() + 1, 2) +
    fill(now.getDate(), 2) +
    fill(now.getHours(), 2) +
    fill(now.getMinutes(), 2) +
    fill(now.getSeconds(), 2) +
    fill(now.getMilliseconds(), 3) +
    Math.random().toFixed(20).substring(2)
  ); // 20 位随机码
}

const userAgentInfo = window.navigator.userAgent.toLocaleLowerCase();
export const isMobile = /(iphone|ipad|ipod|ios|android)/i.test(userAgentInfo);

export const donateAddress = '0x1A56d61142AC107dbC46f1c15a559906D84eEd59';
export const donateEtherscan = 'https://cn.etherscan.com/address/0x1A56d61142AC107dbC46f1c15a559906D84eEd59';

export function truncated(f){
  if (!f) return '';
  return f.substr(0,5) + '...' + f.substr(f.length - 5);
}