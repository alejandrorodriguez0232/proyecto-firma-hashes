# Tecnologías del Proyecto

## 🏗️ **Arquitectura General**
- **dApp (Aplicación Descentralizada)** para registro y verificación de documentos en blockchain
- **Arquitectura cliente-servidor** con frontend web y smart contracts

## 🔗 **Backend (Blockchain)**

### **Smart Contracts**
- **Solidity 0.8.19** - Lenguaje de programación para smart contracts
- **Foundry** - Framework de desarrollo para Ethereum (compilación, testing, despliegue)
- **Anvil** - Nodo local de Ethereum para desarrollo y pruebas

### **Infraestructura Blockchain**
- **Ethereum Virtual Machine (EVM)** - Máquina virtual que ejecuta los smart contracts
- **SHA-256** - Algoritmo de hashing para integridad de documentos
- **Eventos Ethereum** - Sistema de eventos para registro de actividades

## 🌐 **Frontend (Web)**

### **Framework y Core**
- **Next.js 14** - Framework React con renderizado del lado del servidor
- **React 18** - Librería de JavaScript para interfaces de usuario
- **TypeScript 5** - Superset de JavaScript con tipado estático

### **Estilos y UI**
- **TailwindCSS 3.3.0** - Framework de CSS utility-first
- **PostCSS 8** - Herramienta para procesamiento de CSS
- **Autoprefixer 10** - Plugin para prefijos CSS automáticos

### **Blockchain Interaction**
- **Ethers.js 5.7.2** - Librería para interactuar con la blockchain Ethereum
- **Web3.js** - Conexión con wallets de navegador (MetaMask, etc.)

### **Desarrollo**
- **ESLint 8** - Herramienta de linting para JavaScript/TypeScript
- **Node.js 18+** - Entorno de ejecución JavaScript

## 🔧 **Herramientas de Desarrollo**

### **Compilación y Testing**
- **Forge CLI** - Herramienta de línea de comandos de Foundry
- **Solidity Compiler (solc)** - Compilador de smart contracts

### **Entorno Local**
- **Anvil Node** - Blockchain local para desarrollo
- **PowerShell** - Terminal para comandos en Windows

## 📦 **Dependencias Clave**

### **Backend**
- `forge-std` - Librería estándar de Foundry para testing
- Contratos personalizados para registro de documentos

### **Frontend**
- `ethers` - Interacción con blockchain
- `@types/node` - Tipos de Node.js para TypeScript
- `@types/react` - Tipos de React para TypeScript

## 🎯 **Características Técnicas**

- **Hashing criptográfico** para integridad de documentos
- **Timestamps en blockchain** para registro inmutable
- **Eventos emitidos** para seguimiento de actividades
- **Filtrado por usuario** para gestión personalizada
- **Verificación on-chain** para autenticidad de documentos

## 📋 **Versiones Específicas**

### **Backend**
- Solidity: `0.8.19`
- Foundry: Latest
- Anvil: Latest

### **Frontend**
- Next.js: `14.0.4`
- React: `^18`
- TypeScript: `^5`
- Ethers.js: `^5.7.2`
- TailwindCSS: `^3.3.0`
- Node.js: `v18+`

## 🔄 **Flujo de Trabajo**

1. **Desarrollo Local**: Anvil para blockchain local
2. **Compilación**: Forge para smart contracts, Next.js para frontend
3. **Testing**: Forge test para contratos, pruebas manuales para frontend
4. **Despliegue**: Scripts de Foundry para blockchain local
5. **Interacción**: Ethers.js desde frontend hacia smart contracts

Este proyecto combina tecnologías modernas de desarrollo web con capacidades de blockchain para crear un sistema seguro de certificación documental.
