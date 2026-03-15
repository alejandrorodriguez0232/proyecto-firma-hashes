import React, { useState, useEffect } from 'react';
import { useDocumentRegistry } from '@/hooks/useDocumentRegistry';
import { formatAddress, formatTimestamp } from '@/utils/hash';

export const History = () => {
    const [documents, setDocuments] = useState<any[]>([]);
    const [filter, setFilter] = useState('all');
    const { getAllDocuments, getDocumentsByRegistrant, account } = useDocumentRegistry();

    const loadDocuments = async () => {
        let data;
        if (filter === 'my' && account) {
            data = await getDocumentsByRegistrant(account);
        } else {
            data = await getAllDocuments();
        }
        
        const formatted = data.hashes.map((hash: string, index: number) => ({
            hash,
            registrant: data.registrants[index],
            timestamp: data.timestamps[index],
            name: data.names[index]
        }));
        
        setDocuments(formatted);
    };

    useEffect(() => {
        loadDocuments();
    }, [filter, account]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Historial de Documentos</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg ${
                            filter === 'all' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => setFilter('my')}
                        className={`px-4 py-2 rounded-lg ${
                            filter === 'my' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                        Mis Documentos
                    </button>
                </div>
            </div>
            
            {documents.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No hay documentos registrados</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-2">Nombre</th>
                                <th className="text-left py-2">Hash</th>
                                <th className="text-left py-2">Registrante</th>
                                <th className="text-left py-2">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((doc, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="py-2">{doc.name}</td>
                                    <td className="py-2 font-mono text-sm">
                                        {formatAddress(doc.hash)}
                                    </td>
                                    <td className="py-2 font-mono text-sm">
                                        {formatAddress(doc.registrant)}
                                    </td>
                                    <td className="py-2 text-sm">
                                        {formatTimestamp(doc.timestamp)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
