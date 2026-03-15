'use client';

import { RegisterDocument } from '@/components/RegisterDocument';
import { VerifyDocument } from '@/components/VerifyDocument';
import { History } from '@/components/History';

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8">
                    FIRMA DE HASHES
                </h1>
                <p className="text-center text-gray-600 mb-12">
                    Certificados y verificación documental on-chain
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <RegisterDocument />
                    <VerifyDocument />
                </div>
                
                <History />
            </div>
        </main>
    );
}
