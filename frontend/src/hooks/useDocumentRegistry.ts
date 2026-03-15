import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { DocumentInfo, DocumentHistory } from '@/types';

// ABI del contrato (simplificado)
const CONTRACT_ABI = [
    "function registerDocument(bytes32 _documentHash, string memory _documentName) public",
    "function verifyDocument(bytes32 _documentHash) public returns (bool)",
    "function getDocumentInfo(bytes32 _documentHash) public view returns (address registrant, uint256 timestamp, string memory documentName, bool exists)",
    "function getAllDocuments() public view returns (bytes32[] memory hashes, address[] memory registrants, uint256[] memory timestamps, string[] memory names)",
    "function getDocumentsByRegistrant(address _registrant) public view returns (bytes32[] memory hashes, uint256[] memory timestamps, string[] memory names)",
    "event DocumentRegistered(bytes32 indexed documentHash, address indexed registrant, uint256 timestamp, string documentName)",
    "event DocumentVerified(bytes32 indexed documentHash, address indexed verifier, bool exists, uint256 timestamp)"
];

export const useDocumentRegistry = () => {
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [account, setAccount] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const init = async () => {
            try {
                // Conectar a Anvil
                const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
                
                // Obtener signer (usar primera cuenta de Anvil)
                const signer = provider.getSigner(0);
                setSigner(signer);
                
                const address = await signer.getAddress();
                setAccount(address);
                
                // Crear instancia del contrato
                const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
                if (!contractAddress) throw new Error('Contract address not set');
                
                const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);
                setContract(contract);
            } catch (err: any) {
                setError(err.message);
            }
        };
        
        init();
    }, []);

    const registerDocument = useCallback(async (documentHash: string, documentName: string) => {
        if (!contract) return;
        setLoading(true);
        setError('');
        
        try {
            const tx = await contract.registerDocument(documentHash, documentName);
            await tx.wait();
            return true;
        } catch (err: any) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    }, [contract]);

    const verifyDocument = useCallback(async (documentHash: string): Promise<boolean> => {
        if (!contract) return false;
        setLoading(true);
        setError('');
        
        try {
            const exists = await contract.verifyDocument(documentHash);
            return exists;
        } catch (err: any) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    }, [contract]);

    const getDocumentInfo = useCallback(async (documentHash: string): Promise<DocumentInfo | null> => {
        if (!contract) return null;
        
        try {
            const [registrant, timestamp, documentName, exists] = await contract.getDocumentInfo(documentHash);
            return {
                documentHash,
                registrant,
                timestamp: timestamp.toNumber(),
                documentName,
                exists
            };
        } catch (err: any) {
            setError(err.message);
            return null;
        }
    }, [contract]);

    const getAllDocuments = useCallback(async (): Promise<DocumentHistory> => {
        if (!contract) return { hashes: [], registrants: [], timestamps: [], names: [] };
        
        try {
            const [hashes, registrants, timestamps, names] = await contract.getAllDocuments();
            return {
                hashes,
                registrants,
                timestamps: timestamps.map((t: any) => t.toNumber()),
                names
            };
        } catch (err: any) {
            setError(err.message);
            return { hashes: [], registrants: [], timestamps: [], names: [] };
        }
    }, [contract]);

    const getDocumentsByRegistrant = useCallback(async (address: string): Promise<DocumentHistory> => {
        if (!contract) return { hashes: [], registrants: [], timestamps: [], names: [] };
        
        try {
            const [hashes, timestamps, names] = await contract.getDocumentsByRegistrant(address);
            return {
                hashes,
                registrants: new Array(hashes.length).fill(address),
                timestamps: timestamps.map((t: any) => t.toNumber()),
                names
            };
        } catch (err: any) {
            setError(err.message);
            return { hashes: [], registrants: [], timestamps: [], names: [] };
        }
    }, [contract]);

    return {
        contract,
        account,
        loading,
        error,
        registerDocument,
        verifyDocument,
        getDocumentInfo,
        getAllDocuments,
        getDocumentsByRegistrant
    };
};
