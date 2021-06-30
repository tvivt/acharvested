export const metamaskUrl = 'https://metamask.io/';

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
  return (
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

export const truncated = (f) => {
  if (!f) return '';
  return f.substr(0,4) + '...' + f.substr(f.length - 4);
}

export const getWeb3Provider = () => {
  return window.web3Provider;
}

export const setWeb3Provider = (web3Provider) => {
  window.web3Provider = web3Provider;
}

export const getProvider = () => {
  return window.provider;
}

export const setProvider = (provider) => {
  window.provider = provider;
}

export const getWeb3Modal = () => {
  return window.web3Modal;
}

export const setWeb3Modal = (web3Modal) => {
  window.web3Modal = web3Modal;
}

export const logoutOfWeb3Modal = async () => {
  const provider = getProvider();
  const web3Modal = getWeb3Modal();
  if (provider && web3Modal){
    if (provider.close){
      await provider.close();
    }
    await web3Modal.clearCachedProvider();
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }
};

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