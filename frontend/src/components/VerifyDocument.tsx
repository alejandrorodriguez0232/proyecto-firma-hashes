import React, { useState } from 'react';
import { useDocumentRegistry } from '@/hooks/useDocumentRegistry';
import { calculateDocumentHash, formatTimestamp } from '@/utils/hash';

export const VerifyDocument = () => {
    const [documentContent, setDocumentContent] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationResult, setVerificationResult] = useState<any>(null);
    const { verifyDocument, getDocumentInfo, error } = useDocumentRegistry();

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!documentContent) return;
        
        setIsVerifying(true);
        setVerificationResult(null);
        
        const hash = calculateDocumentHash(documentContent);
        
        // Verificar existencia
        const exists = await verifyDocument(hash);
        
        if (exists) {
            // Obtener información completa
            const info = await getDocumentInfo(hash);
            setVerificationResult({
                exists: true,
                ...info
            });
        } else {
            setVerificationResult({
                exists: false,
                hash
            });
        }
        
        setIsVerifying(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Verificar Documento</h2>
            
            <form onSubmit={handleVerify}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Contenido del Documento a Verificar
                    </label>
                    <textarea
                        value={documentContent}
                        onChange={(e) => setDocumentContent(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        required
                    />
                </div>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}
                
                {verificationResult && (
                    <div className={`mb-4 p-4 rounded-lg ${
                        verificationResult.exists ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                        <h3 className="font-bold mb-2">
                            {verificationResult.exists ? '✅ Documento Válido' : '❌ Documento No Encontrado'}
                        </h3>
                        <p className="text-sm break-all">Hash: {verificationResult.documentHash || verificationResult.hash}</p>
                        
                        {verificationResult.exists && (
                            <>
                                <p className="text-sm">Registrante: {verificationResult.registrant}</p>
                                <p className="text-sm">Nombre: {verificationResult.documentName}</p>
                                <p className="text-sm">Fecha: {formatTimestamp(verificationResult.timestamp)}</p>
                            </>
                        )}
                    </div>
                )}
                
                <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-green-300"
                >
                    {isVerifying ? 'Verificando...' : 'Verificar Documento'}
                </button>
            </form>
        </div>
    );
};
