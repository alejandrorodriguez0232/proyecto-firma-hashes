export interface DocumentInfo {
    documentHash: string;
    registrant: string;
    timestamp: number;
    documentName: string;
    exists: boolean;
}

export interface DocumentHistory {
    hashes: string[];
    registrants: string[];
    timestamps: number[];
    names: string[];
}

export interface DocumentByRegistrant {
    hashes: string[];
    timestamps: number[];
    names: string[];
}
