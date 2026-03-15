# Guía de Instalación Rápida

## 🚀 Pasos para Ejecutar el Proyecto

### 1. Instalar Foundry (si no lo tienes)

```powershell
# En PowerShell (como administrador)
cd ~
curl -L https://foundry.paradigm.xyz | bash
# Cierra y abre nueva terminal PowerShell
foundryup

o

choco install foundry
```

### 2. Configurar Backend

```powershell
# Navegar al backend
cd C:\proyecto-firma-hashes\backend

# Instalar dependencias de Foundry
forge install

# Compilar contratos
forge build

# Ejecutar tests
forge test

# Iniciar nodo local Anvil (deja esta terminal abierta)
anvil
```

### 3. Desplegar Contrato

```powershell
# En NUEVA terminal PowerShell (en carpeta backend)
cd C:\proyecto-firma-hashes\backend
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast
```

**COPIA LA DIRECCIÓN DEL CONTRATO** - Se verá algo como:
```
Deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### 4. Configurar Frontend

```powershell
# Navegar al frontend
cd C:\proyecto-firma-hashes\frontend

# Instalar dependencias
npm install
```

### 5. Actualizar Dirección del Contrato

Edita `C:\proyecto-firma-hashes\frontend\.env.local` y reemplaza la dirección:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=AQUI_LA_DIRECCION_REAL_DEL_CONTRATO
NEXT_PUBLIC_RPC_URL=http://localhost:8545
```

### 6. Ejecutar Frontend

```powershell
# En NUEVA terminal PowerShell (en carpeta frontend)
cd C:\proyecto-firma-hashes\frontend
npm run dev
```

### 7. Usar la Aplicación

1. Abre tu navegador en **http://localhost:3000**
2. Asegúrate que Anvil sigue corriendo en la primera terminal
3. ¡Listo para registrar y verificar documentos!

## 🔍 Verificación Rápida

1. **Registrar:** Escribe "Hola Mundo" como nombre y contenido
2. **Verificar:** Pega el mismo texto y verifica que existe
3. **Historial:** Revisa que aparezca en la tabla

## 🛠️ Si algo falla

### Error: "foundryup no reconocido"
- Reinicia PowerShell después de instalar Foundry
- Verifica la instalación con `foundryup --version`

### Error: "Contract address not set"
- Asegúrate de actualizar la dirección en `.env.local`
- Verifica que el contrato esté desplegado

### Error: "Cannot connect to RPC"
- Asegúrate que Anvil está corriendo
- Verifica que el puerto 8545 esté disponible

## 📱 Resumen de Terminales

Necesitarás **3 terminales** abiertas:

1. **Terminal 1:** `cd backend && anvil` (nodo blockchain)
2. **Terminal 2:** `cd backend && forge script...` (despliegue - una sola vez)
3. **Terminal 3:** `cd frontend && npm run dev` (aplicación web)

¡Tu dApp está lista! 🎉
