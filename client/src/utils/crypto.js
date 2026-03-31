import { ethers } from "ethers";

export const wrapPaymentData = (sender, receiver, amount) => {
  return ethers.utils.defaultAbiCoder.encode(["address", "address", "uint256"], [sender, receiver, amount]);
};
