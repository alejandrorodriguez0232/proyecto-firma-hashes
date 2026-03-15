# Proyecto 1: FIRMA DE HASHES - Certificados y verificación documental on-chain

## 📋 Descripción

Esta dApp permite registrar y verificar documentos en blockchain usando hashes. Los usuarios pueden:
- Registrar documentos con su contenido y nombre
- Verificar la autenticidad de documentos comparando hashes
- Ver el historial completo de documentos registrados
- Filtrar documentos por usuario

## 🏗️ Estructura del Proyecto

```
proyecto-firma-hashes/
├── backend/                    # Smart contracts (Foundry)
│   ├── src/
│   │   └── DocumentRegistry.sol
│   ├── script/
│   │   └── Deploy.s.sol
│   ├── test/
│   │   └── DocumentRegistry.t.sol
│   ├── foundry.toml
│   └── .env
├── frontend/                   # Next.js + TypeScript
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── RegisterDocument.tsx
│   │   │   ├── VerifyDocument.tsx
│   │   │   └── History.tsx
│   │   ├── hooks/
│   │   │   └── useDocumentRegistry.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── utils/
│   │       └── hash.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── .env.local
└── README.md
```

## 🚀 Instalación y Ejecución

### Prerrequisitos

1. **Node.js** (v18 o superior)
2. **Foundry** - Para desarrollo de smart contracts

### Instalar Foundry (si no lo tienes)

```powershell
# En PowerShell (como administrador)
cd ~
curl -L https://foundry.paradigm.xyz | bash
# Cierra y abre nueva terminal PowerShell
foundryup
```

### Paso 1: Configurar Backend

```powershell
# Navegar al proyecto
cd C:\proyecto-firma-hashes\backend

# Instalar dependencias de Foundry
forge install

# Compilar contratos
forge build

# Ejecutar tests
forge test

# Iniciar nodo local Anvil (en nueva terminal)
anvil
```

### Paso 2: Desplegar Contrato

```powershell
# En otra terminal (en carpeta backend)
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast
```

**IMPORTANTE:** Copia la dirección del contrato desplegado y actualízala en `frontend/.env.local`

### Paso 3: Configurar Frontend

```powershell
# Navegar al frontend
cd C:\proyecto-firma-hashes\frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Paso 4: Ejecutar Aplicación

1. Asegúrate que Anvil está corriendo en una terminal
2. Inicia el frontend con `npm run dev`
3. Abre tu navegador en http://localhost:3000

## 🔧 Configuración

### Variables de Entorno

#### Backend (.env)
```
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

#### Frontend (.env.local)
```
NEXT_PUBLIC_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
NEXT_PUBLIC_RPC_URL=http://localhost:8545
```

**Nota:** Reemplaza `NEXT_PUBLIC_CONTRACT_ADDRESS` con la dirección real de tu contrato desplegado.

## 🎯 Funcionalidades

### ✅ Registro de Documentos
- Ingresa nombre y contenido del documento
- Calcula automáticamente el hash SHA-256
- Registra en blockchain con timestamp

### ✅ Verificación de Documentos
- Ingresa el contenido a verificar
- Compara hash con registros en blockchain
- Muestra información completa si existe

### ✅ Historial
- Lista todos los documentos registrados
- Filtra por "Todos" o "Mis Documentos"
- Muestra hash, registrante, nombre y fecha

## 🧪 Testing

### Backend Tests
```powershell
cd backend
forge test
```

### Pruebas Manuales
1. **Registrar documento:** Escribe "Mi primer documento" y regístralo
2. **Verificar documento:** Pega el mismo texto y verifica que existe
3. **Modificar documento:** Cambia una letra y verifica que ya no existe
4. **Ver historial:** Revisa la tabla de documentos registrados

## 🛠️ Solución de Problemas

### Error: "Contract address not set"
- Verifica que `NEXT_PUBLIC_CONTRACT_ADDRESS` en `.env.local` sea la dirección correcta
- Asegúrate que el contrato está desplegado

### Error: "Cannot read properties of undefined"
- Asegúrate que Anvil está corriendo en http://localhost:8545
- Verifica que el contrato está desplegado correctamente

### Error de conexión
- Comprueba que Anvil está en la terminal correcta
- Verifica que el puerto 8545 no está bloqueado

## 📚 Tecnologías Utilizadas

### Backend
- **Solidity** - Smart contracts
- **Foundry** - Framework de desarrollo
- **Anvil** - Nodo local de Ethereum

### Frontend
- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **TailwindCSS** - Estilos
- **Ethers.js** - Interacción con blockchain

## 🎉 ¡Listo!

Tu dApp de certificación documental está lista para usar. Ahora puedes registrar y verificar documentos de forma segura en blockchain.
