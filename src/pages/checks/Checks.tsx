import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';
import { Badge } from 'antd';
import Loading from '../../application/components/Loading/Loading';
import { getAddress, getNonce, getSign } from '../../application/store/user';
import { 
  fetchCheckListByServerless,
  fetchPremiumcheckByServerless,
  PremiumCheckEntity
} from '../../application/shared/apis';
import { getLearns } from '../../application/store/premium';
import { ResponseCode } from '../../application/shared/status';
import { getWeb3Provider, createUnique } from '../../application/shared';
import balanceOfABI from '../../application/ABI/balanceOf.json';
import './Checks.css';

interface CheckItemContract{
  name: string;
  contract: ethers.Contract;
}

interface CheckItem{
  contract: CheckItemContract[];
  ask: string[];
}

interface CheckResultData{
  name: string;
  check: boolean;
}

const checkItem: CheckItem = {
  contract: [],
  ask: []
}

const checkBalance = async (contract: ethers.Contract, address: string) => {
  const balance = await contract.balanceOf(address);
  if (isNaN(balance)){
    return false;
  }
  if (Number(balance) >= 1){
    return true;
  }
  return false;
}

const contractResultProgress = async (checkAddress: string) => {
  const contractResult: CheckResultData[] = []
  for (const contractItem of checkItem.contract) {
    try{
      const balanceResult = await checkBalance(contractItem.contract, checkAddress);
      const contractResultItem = {
        name: contractItem.name,
        check: balanceResult
      }
      contractResult.push(contractResultItem);
    } catch(e){
      console.log(e)
      console.log(contractItem)
    }
  }
  const noResult = contractResult.filter(v => !v.check);
  const yesResult = contractResult.filter(v => v.check);
  return [...noResult, ...yesResult];
}

const Checks = () => {
  const address = useSelector(getAddress);
  const nonce = useSelector(getNonce);
  const sign = useSelector(getSign);
  const learns = useSelector(getLearns);
  const [checkResult, setCheckResult] = useState<PremiumCheckEntity | null>(null);
  const checklistLock = useRef(true);
  const [checkStatusUI, setCheckStatusUI] = useState(0);
  const [checkStatus, setCheckStatus] = useState(0);
 
  useEffect(() => {
    if (learns.length === 0){
      window.location.href = '/';
      return
    }
    if (checkItem.contract.length > 0){
      setCheckStatus(1);
    }
    if (sign && checklistLock.current && checkItem.contract.length === 0){
      checklistLock.current = false;
      fetchCheckListByServerless(nonce, sign, address).then((response) => {
        const { code, data } = response.data;
        if (code === ResponseCode.ok){
          const web3Provider = getWeb3Provider();
          if (web3Provider){
            const { contract, ask } = data;
            const checkContract: any  = [];
            const checkAsk = ask;
            contract.forEach((v) => {
              const c = new ethers.Contract(v.address, balanceOfABI.balanceOf, web3Provider);
              checkContract.push({
                name: v.name,
                contract: c
              });
            });
            checkItem.contract = checkContract;
            checkItem.ask = checkAsk;
            setCheckStatus(1);
          }
        }
      });
    }
    if (!checkResult && sign && checkStatus === 1){
      fetchPremiumcheckByServerless(nonce, sign, address, 'learn').then((response) => {
        const { code, data } = response.data;
        if (code === ResponseCode.ok){
          setCheckResult(data);
          setCheckStatus(2);
          setCheckStatusUI(1);
        } else {
          contractResultProgress(address).then((contractResult) => {
            const newAsk = checkItem.ask.map((v) => {
              return {
                name: v,
                check: false
              }
            });
            setCheckResult({
              address,
              type: 'learn',
              contents: {
                [address]: {
                  contract: contractResult,
                  ask: newAsk
                }
              }
            });
            setCheckStatus(1);
            setCheckStatusUI(1);
          }).catch((e) => {
            
          });
        }
      });
    }
  },[sign, checkStatus, address, checkResult, nonce, learns]);

  const renderBadge = useCallback((check: boolean, type: string) => {
    if (checkStatus === 1 && type === 'ask'){
      return <Badge status="default" />;
    }
    if (check) {
      return <Badge status="success" />;
    }
    if (!check){
      return <Badge status="error" />;
    }
  }, [checkStatus]);

  const renderCheckResult = useMemo(() => {
    if (checkStatusUI === 0){
      return (
        <div className='checks-loading'>
          <Loading />
        </div>
      )
    }
    if (checkStatusUI === 1){
      const keys = Object.keys(checkResult!.contents);
      return (
        <div className='checks-content'>
          <div className='checks-header'>
            <span style={{marginRight: '15px', fontSize: '15px', fontWeight: 'bold'}}>
              颜色说明：
            </span>
            <span style={{marginRight: '10px'}}>
              <Badge status="error" />未满足条件 
            </span>
            <span style={{marginRight: '10px'}}>
              <Badge status="success" />满足条件 
            </span>
            <span style={{marginRight: '10px'}}>
              <Badge status="default" />无法检测 
            </span>
          </div>
          {
            keys.map((v) => {
              return (
                <div className='checks-box' key={v}>
                  <div className='checks-box-contract'>
                    {
                      checkResult!.contents[v].contract.map((c) => {
                        return (
                          <div className='checks-box-item' key={c.name}>
                            <div className='checks-box-badge'>
                              {renderBadge(c.check, 'contract')}
                            </div>
                            <div className='checks-box-name'>
                              {c.name}
                            </div>
                          </div>
                        )
                      })
                    }
                    {
                      checkResult!.contents[v].ask.map((as) => {
                        return (
                          <div className='checks-box-item' key={createUnique()}>
                            <div className='checks-box-badge'>
                              {renderBadge(as.check, 'ask')}
                            </div>
                            <div className='checks-box-name'>
                              是否{as.name}
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      )
    }
  }, [checkStatusUI, checkResult, renderBadge]);
  return (
    <div className='checks'>
      {renderCheckResult}
    </div>
  )
}

export default Checks;