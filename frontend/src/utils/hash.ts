import { ethers } from 'ethers';

export const calculateDocumentHash = (content: string): string => {
    return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(content));
};

export const formatAddress = (address: string): string => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleString();
};
