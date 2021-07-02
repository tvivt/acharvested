export enum ResponseCode{
  ok = 0,
  verifyError = 1,
  expired = 2,
  noParams = 3,
  admin = 10
}

export enum ConnectWalletStatus{
  no = 0,
  initProvider = 1,
  connected = 2
}