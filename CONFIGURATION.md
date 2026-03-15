# 📋 CONFIGURACIÓN COMPLETA DEL PROYECTO

## 🔧 Configuración de Backend (Foundry)

### 1. foundry.toml
```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc = "0.8.19"
remappings = [
    "forge-std/=lib/forge-std/src/"
]

[rpc_endpoints]
anvil = "http://localhost:8545"
```

### 2. .env (Backend)
```env
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### 3. Estructura de Carpetas Backend
```
backend/
├── src/
│   └── DocumentRegistry.sol
├── script/
│   └── Deploy.s.sol
├── test/
│   └── DocumentRegistry.t.sol
├── foundry.toml
├── .env
└── lib/
```

## 🔧 Configuración de Frontend (Next.js)

### 1. package.json
```json
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "^18",
    "react-dom": "^18",
    "ethers": "^5.7.2",
    "@types/node": "^20",
    "typescript": "^5",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.0.1",
    "postcss": "^8"
  },
  "devDependencies": {
    "eslint": "^8",
    "eslint-config-next": "14.0.4",
    "@types/react": "^18",
    "@types/react-dom": "^18"
  }
}
```

### 2. .env.local (Frontend)
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
NEXT_PUBLIC_RPC_URL=http://localhost:8545
```

### 3. tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 4. tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
```

### 5. Estructura de Carpetas Frontend
```
frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── RegisterDocument.tsx
│   │   ├── VerifyDocument.tsx
│   │   └── History.tsx
│   ├── hooks/
│   │   └── useDocumentRegistry.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       └── hash.ts
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── .env.local
```

## 🔧 Configuración de Contrato Inteligente

### 1. DocumentRegistry.sol - Configuración Principal
```solidity
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

    mapping(bytes32 => Document) public documents;
    bytes32[] public documentHashes;
    
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
    
    // Funciones principales...
}
```

### 2. ABI del Contrato (para Frontend)
```javascript
const CONTRACT_ABI = [
    "function registerDocument(bytes32 _documentHash, string memory _documentName) public",
    "function verifyDocument(bytes32 _documentHash) public returns (bool)",
    "function getDocumentInfo(bytes32 _documentHash) public view returns (address registrant, uint256 timestamp, string memory documentName, bool exists)",
    "function getAllDocuments() public view returns (bytes32[] memory hashes, address[] memory registrants, uint256[] memory timestamps, string[] memory names)",
    "function getDocumentsByRegistrant(address _registrant) public view returns (bytes32[] memory hashes, uint256[] memory timestamps, string[] memory names)",
    "event DocumentRegistered(bytes32 indexed documentHash, address indexed registrant, uint256 timestamp, string documentName)",
    "event DocumentVerified(bytes32 indexed documentHash, address indexed verifier, bool exists, uint256 timestamp)"
];
```

## 🔧 Configuración de Desarrollo

### 1. Puertos y Endpoints
- **Anvil (Blockchain Local)**: http://localhost:8545
- **Frontend (Next.js)**: http://localhost:3000
- **Contrato Desplegado**: Variable (se obtiene al desplegar)

### 2. Cuentas de Anvil (por defecto)
```
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Account #2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (10000 ETH)
... (y más cuentas)
```

### 3. Private Keys (Anvil - Testing)
```
Private Key #0: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
Private Key #1: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6d7836e6
... (y más private keys)
```

## 🔧 Configuración de Entorno

### Variables de Entorno Requeridas

#### Backend (.env)
```env
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
NEXT_PUBLIC_RPC_URL=http://localhost:8545
```

### Notas Importantes
- `NEXT_PUBLIC_CONTRACT_ADDRESS` debe ser actualizado con la dirección real del contrato desplegado
- `PRIVATE_KEY` es la clave privada del cuenta que despliega el contrato
- `NEXT_PUBLIC_RPC_URL` es la URL del nodo blockchain local (Anvil)

## 🔧 Configuración de Build y Deploy

### Comandos de Backend
```powershell
# Compilar
forge build

# Testear
forge test

# Iniciar nodo local
anvil

# Desplegar contrato
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast
```

### Comandos de Frontend
```powershell
# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar producción
npm start
```

## 🔧 Configuración de Dependencias

### Dependencias Principales
- **Solidity**: 0.8.19
- **Foundry**: Latest
- **Next.js**: 14.0.4
- **React**: 18.x
- **TypeScript**: 5.x
- **Ethers.js**: 5.7.2
- **TailwindCSS**: 3.3.0

### Dependencias de Desarrollo
- **ESLint**: 8.x
- **@types/react**: 18.x
- **@types/react-dom**: 18.x
- **@types/node**: 20.x

## 🔧 Configuración de Seguridad

### Best Practices
1. **Nunca exponer private keys en producción**
2. **Usar variables de entorno para datos sensibles**
3. **Validar inputs en el smart contract**
4. **Usar eventos para tracking de operaciones**
5. **Implementar controles de acceso si es necesario**

### Consideraciones de Seguridad
- El contrato actual es público (cualquiera puede registrar)
- Para producción, considerar agregar controles de acceso
- Los hashes son inmutables una vez registrados
- Los timestamps usan `block.timestamp`

## 🔧 Configuración de Testing

### Tests de Smart Contract
```solidity
// Test de registro de documento
function testRegisterDocument() public {
    bytes32 hash = keccak256(abi.encodePacked("test document"));
    string memory name = "Test Document";
    
    vm.prank(alice);
    registry.registerDocument(hash, name);
    
    (address registrant, uint256 timestamp, string memory docName, bool exists) = 
        registry.getDocumentInfo(hash);
        
    assertEq(registrant, alice);
    assertEq(docName, name);
    assertTrue(exists);
    assertTrue(timestamp > 0);
}
```

### Tests Manuales (Frontend)
1. Registrar documento con contenido conocido
2. Verificar mismo contenido
3. Verificar contenido modificado (debe fallar)
4. Ver historial de documentos
5. Filtrar por usuario

## 🔧 Configuración de Deploy

### Deploy Local (Anvil)
```powershell
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast
```

### Deploy Testnet (Ejemplo Sepolia)
```powershell
forge script script/Deploy.s.sol --rpc-url https://sepolia.infura.io/v3/YOUR_PROJECT_ID --broadcast
```

### Deploy Mainnet (Producción)
```powershell
forge script script/Deploy.s.sol --rpc-url https://mainnet.infura.io/v3/YOUR_PROJECT_ID --broadcast --verify
```

## 🔧 Configuración de Monitorización

### Eventos a Monitorizar
1. `DocumentRegistered` - Cuando se registra un nuevo documento
2. `DocumentVerified` - Cuando se verifica un documento

### Logs Útiles
- Timestamp de registro
- Dirección del registrante
- Hash del documento
- Nombre del documento
- Resultado de verificación

## 🔧 Configuración de Troubleshooting

### Problemas Comunes y Soluciones

1. **"Contract address not set"**
   - Actualizar `NEXT_PUBLIC_CONTRACT_ADDRESS` en `.env.local`
   - Verificar que el contrato esté desplegado

2. **"Cannot connect to RPC"**
   - Asegurar que Anvil está corriendo
   - Verificar puerto 8545 disponible

3. **"Foundry not found"**
   - Instalar Foundry: `curl -L https://foundry.paradigm.xyz | bash`
   - Reiniciar terminal

4. **"TypeScript errors"**
   - Ejecutar `npm install` en frontend
   - Verificar configuración de `tsconfig.json`

5. **"Ethers.js connection errors"**
   - Verificar versión de ethers.js (5.7.2)
   - Revisar configuración de provider

---

## 📋 Checklist de Configuración

- [ ] Foundry instalado y configurado
- [ ] Backend compilado (`forge build`)
- [ ] Tests pasando (`forge test`)
- [ ] Anvil corriendo en puerto 8545
- [ ] Contrato desplegado
- [ ] Dirección del contrato actualizada en `.env.local`
- [ ] Dependencias de frontend instaladas (`npm install`)
- [ ] Frontend corriendo en puerto 3000
- [ ] Conexión con blockchain funcionando
- [ ] Funciones de registro/verificación operativas

¡Configuración completa! 🎉
