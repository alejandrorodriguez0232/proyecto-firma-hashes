// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DocumentRegistry {
    struct Document {
        bytes32 documentHash;
        address registrant;
        uint256 timestamp;
        string documentName;
        bool exists;
    }

    // Mapeo de hash del documento a su información
    mapping(bytes32 => Document) public documents;
    
    // Array para llevar historial
    bytes32[] public documentHashes;
    
    // Eventos
    event DocumentRegistered(
        bytes32 indexed documentHash,
        address indexed registrant,
        uint256 timestamp,
        string documentName
    );
    
    event DocumentVerified(
        bytes32 indexed documentHash,
        address indexed verifier,
        bool exists,
        uint256 timestamp
    );

    // Registrar un documento
    function registerDocument(
        bytes32 _documentHash,
        string memory _documentName
    ) public {
        require(_documentHash != bytes32(0), "Hash no puede ser cero");
        require(!documents[_documentHash].exists, "Documento ya registrado");
        
        documents[_documentHash] = Document({
            documentHash: _documentHash,
            registrant: msg.sender,
            timestamp: block.timestamp,
            documentName: _documentName,
            exists: true
        });
        
        documentHashes.push(_documentHash);
        
        emit DocumentRegistered(
            _documentHash,
            msg.sender,
            block.timestamp,
            _documentName
        );
    }

    // Verificar si un documento existe y no ha sido alterado
    function verifyDocument(bytes32 _documentHash) public returns (bool) {
        bool exists = documents[_documentHash].exists;
        
        emit DocumentVerified(
            _documentHash,
            msg.sender,
            exists,
            block.timestamp
        );
        
        return exists;
    }

    // Obtener información de un documento
    function getDocumentInfo(bytes32 _documentHash) public view returns (
        address registrant,
        uint256 timestamp,
        string memory documentName,
        bool exists
    ) {
        Document memory doc = documents[_documentHash];
        return (
            doc.registrant,
            doc.timestamp,
            doc.documentName,
            doc.exists
        );
    }

    // Obtener todos los documentos registrados
    function getAllDocuments() public view returns (
        bytes32[] memory hashes,
        address[] memory registrants,
        uint256[] memory timestamps,
        string[] memory names
    ) {
        uint256 length = documentHashes.length;
        
        hashes = new bytes32[](length);
        registrants = new address[](length);
        timestamps = new uint256[](length);
        names = new string[](length);
        
        for (uint256 i = 0; i < length; i++) {
            bytes32 hash = documentHashes[i];
            Document memory doc = documents[hash];
            
            hashes[i] = hash;
            registrants[i] = doc.registrant;
            timestamps[i] = doc.timestamp;
            names[i] = doc.documentName;
        }
        
        return (hashes, registrants, timestamps, names);
    }

    // Obtener documentos por registrante
    function getDocumentsByRegistrant(address _registrant) public view returns (
        bytes32[] memory hashes,
        uint256[] memory timestamps,
        string[] memory names
    ) {
        uint256 count = 0;
        
        // Primero contar cuántos documentos tiene este registrante
        for (uint256 i = 0; i < documentHashes.length; i++) {
            bytes32 hash = documentHashes[i];
            if (documents[hash].registrant == _registrant) {
                count++;
            }
        }
        
        // Crear arrays
        hashes = new bytes32[](count);
        timestamps = new uint256[](count);
        names = new string[](count);
        
        // Llenar arrays
        uint256 index = 0;
        for (uint256 i = 0; i < documentHashes.length; i++) {
            bytes32 hash = documentHashes[i];
            if (documents[hash].registrant == _registrant) {
                hashes[index] = hash;
                timestamps[index] = documents[hash].timestamp;
                names[index] = documents[hash].documentName;
                index++;
            }
        }
        
        return (hashes, timestamps, names);
    }
}
