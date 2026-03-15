import React, { useState } from 'react';
import { useDocumentRegistry } from '@/hooks/useDocumentRegistry';
import { calculateDocumentHash } from '@/utils/hash';

export const RegisterDocument = () => {
    const [documentName, setDocumentName] = useState('');
    const [documentContent, setDocumentContent] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [result, setResult] = useState<string>('');
    const { registerDocument, account, error } = useDocumentRegistry();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!documentName || !documentContent) return;
        
        setIsRegistering(true);
        setResult('');
        
        const hash = calculateDocumentHash(documentContent);
        const success = await registerDocument(hash, documentName);
        
        if (success) {
            setResult(`Documento registrado exitosamente!\nHash: ${hash}`);
            setDocumentName('');
            setDocumentContent('');
        } else {
            setResult('Error al registrar el documento');
        }
        
        setIsRegistering(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Registrar Documento</h2>
            <p className="text-sm text-gray-600 mb-4">Cuenta: {account}</p>
            
            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Nombre del Documento
                    </label>
                    <input
                        type="text"
                        value={documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Contenido del Documento
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
                
                {result && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg whitespace-pre-line">
                        {result}
                    </div>
                )}
                
                <button
                    type="submit"
                    disabled={isRegistering}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                >
                    {isRegistering ? 'Registrando...' : 'Registrar Documento'}
                </button>
            </form>
        </div>
    );
};
