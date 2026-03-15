// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/DocumentRegistry.sol";

contract DocumentRegistryTest is Test {
    DocumentRegistry public registry;
    address public alice = address(0x1);
    
    function setUp() public {
        registry = new DocumentRegistry();
        vm.deal(alice, 10 ether);
    }
    
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
    
    function testVerifyDocument() public {
        bytes32 hash = keccak256(abi.encodePacked("test document"));
        
        bool exists = registry.verifyDocument(hash);
        assertFalse(exists);
        
        vm.prank(alice);
        registry.registerDocument(hash, "Test");
        
        exists = registry.verifyDocument(hash);
        assertTrue(exists);
    }
    
    function testFailRegisterDuplicate() public {
        bytes32 hash = keccak256(abi.encodePacked("test"));
        
        registry.registerDocument(hash, "Test 1");
        registry.registerDocument(hash, "Test 2");
    }
}
