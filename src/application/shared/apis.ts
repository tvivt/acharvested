import axios, { AxiosPromise } from 'axios';
import { ResponseCode } from './status';

const baseHost = process.env.NODE_ENV === 'development' ? '' : 'https://airdrop.acharvested.me';

export interface Response<T = any>{
  code: ResponseCode;
  data: T;
}

export interface TotalEntity{
  accounts: number;
  learns: number;
  potentials: number;
  price: number;
}

export const fetchTotalByServerless = (): AxiosPromise<Response<TotalEntity>> => {
  const url = `${baseHost}/api/total`;
  return axios({
    url
  });
}

export interface Nonce{
  nonce: string;
}

export const fetchNonceByServerless = (): AxiosPromise<Response<Nonce>> => {
  const url = `${baseHost}/api/nonce`;
  return axios({
    url
  });
}

interface DescEntity{
  [key: string]: string[];
}

interface GuessEntity{
  [key: string]: string[];
}

export interface LearnEntity{
  icon: string;
  name: string;
  url: string;
  description: DescEntity;
}

export interface PotentialEntity{
  icon: string;
  name: string;
  mark: number;
  url: string;
  description: DescEntity;
  guess: GuessEntity;
}

export interface VerifyResult{
  potentials: PotentialEntity[];
  learns: LearnEntity[];
  yuque: any[];
}

type VerifyResultFunc = (nonce: string, sign: string, address: string) => AxiosPromise<Response<VerifyResult>>

export const fetchVerifyResultByServerless: VerifyResultFunc = (nonce, sign, address) => {
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

interface RulesEntity{
  [key: string]: string[];
}

export interface ArchivedEntity{
  name: string;
  icon: string;
  url: string;
  rules: RulesEntity
}

type ArchivedFunc = (nonce: string, sign: string, address: string, page?: number) => AxiosPromise<Response<ArchivedEntity>>;

export const fetchArchivedByServerless: ArchivedFunc = (nonce, sign, address, page) => {
  const url = `${baseHost}/api/archived`;
  return axios({
    url,
    params: {
      nonce,
      sign,
      address,
      page
    }
  });
}