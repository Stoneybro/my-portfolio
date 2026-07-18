---
title: "Understanding Custom Smart Wallets"
publishedAt: "2025-09-01T00:00:00.000Z"
slug: "understanding-custom-smart-wallets"
excerpt: "Smart wallets unlock automation and flexibility onchain. This guide covers ERC-4337 and how to build smart wallets for any use case."
status: "published"
---

**Prerequisite**: You should have a good understanding of [Ethereum accounts](https://ethereum.org/developers/docs/accounts/) and [transactions](https://ethereum.org/developers/docs/transactions/).

## Introduction

There are two main types of accounts on Ethereum: **Externally Owned Accounts (EOAs)** and **Smart Accounts**. They both hold assets and interact with contracts, but they differ fundamentally in a few ways:

**EOAs** are the traditional account type.

They're created from key pairs and controlled entirely by private keys. With a private key, an EOA can directly initiate and sign transactions.

**Smart Accounts** on the other hand, are smart contracts deployed on-chain.

Unlike EOAs, they cannot initiate transactions on their own. Instead, they respond to transactions that are sent to them.

What makes Smart Accounts powerful is their programmability. Developers can encode rules such as:

- spending limits
- multi-signature approvals
- automated actions

Smart Accounts replicate everything an EOA can do while adding layers of flexibility and customization through code.

To standardize how these accounts interact, Ethereum introduced **ERC-4337**, the Account Abstraction standard. This defines how transactions are validated, executed, and paid for.

**Custom smart wallets** are built on top of these Smart Accounts.
Just as apps like MetaMask provide an interface for EOAs, custom smart wallets provide an interface for Smart Accounts, tailored to specific use cases or user experiences.

In the next section, we'll dive into the mechanics of Smart Accounts under the ERC-4337 standard.

---

## Core Mechanics

The ERC-4337 Account Abstraction standard is the foundation of modern smart wallets. It defines how smart accounts process transactions without relying on traditional externally owned accounts (EOAs). To understand how these wallets work, we first need to cover some concepts.

### Key Concepts

**UserOperations (UserOps)**: EOAs send transactions that specify a recipient, value, and optional data. Smart accounts instead send UserOperations, a higher-level request format defined by ERC-4337. A UserOp contains similar fields but adds flexibility, such as batching multiple calls into one submission and alternative forms of gas payment.

```json
//EOA transactions
{
  "to": "0xRecipient",
  "value": "1000000000000000000",
  "data": "0x...",
  "gas": 21000,
  "nonce": 1,
  "chainId": 1
}
```

```json
//Smart Account User Operation
{
  "sender": "0xSmartAccount",
  "nonce": 1,
  "initCode": "0x...",
  "callData": "0x...",
  "callGasLimit": 100000,
  "verificationGasLimit": 100000,
  "preVerificationGas": 21000,
  "maxFeePerGas": "1000000000",
  "maxPriorityFeePerGas": "1000000000",
  "paymasterAndData": "0x...",
  "signature": "0x..."
}
```

**Bundlers**: Unlike EOAs, UserOps aren't sent directly to the blockchain. Instead, they go to a bundler, a specialized node service. Bundlers collect many UserOps, bundle them into a transaction, and submit them to the EntryPoint contract.

**EntryPoint**: The EntryPoint is a shared, secure on-chain contract used by all ERC-4337 smart accounts. It validates UserOps, executes them, and handles gas accounting. Think of it as the universal router for all smart wallet activity.

**Paymasters**: Paymasters allow someone else (like a dApp or a service) to pay gas on behalf of the user. This is how "gasless transactions" work — users interact without holding ETH, while the paymaster covers fees under certain rules.

---

## Anatomy of a Smart Account

A typical smart account implements three core functions:

### 1. ValidateUserOp

It ensures that a submitted UserOperation is valid. The developer decides what "valid" means, it could be a simple check recovering an ECDSA signature recovery or it could be a more advanced check that may require multiple signatures, biometrics and social recovery.

```solidity
function validateUserOp(
    UserOperation calldata userOp,
    bytes32 userOpHash,
    uint256 missingAccountFunds
) external returns (uint256 validationData) {
    bytes32 hash = userOpHash.toEthSignedMessageHash();
    address recovered = hash.recover(userOp.signature);
    
    require(recovered == owner, "Invalid signature");
    
    if (missingAccountFunds > 0) {
        (bool success,) = payable(msg.sender).call{
            value: missingAccountFunds
        }("");
        require(success, "Prefund failed");
    }
    
    return 0; // 0 means validation success
}
```

### 2. Execute

It carries out the userOperation once validation passes. It takes the following parameters:

- `to`: the destination address
- `value`: the amount of ETH to send
- `calldata`: the function call or data payload to execute

This function allows the smart account to transfer ETH, interact with other contracts, or perform custom logic defined by the account developer.

```solidity
function execute(
    address to,
    uint256 value,
    bytes calldata data
) external {
    require(msg.sender == address(entryPoint), "Only EntryPoint");
    
    (bool success, bytes memory result) = to.call{value: value}(data);
    require(success, string(result));
}
```

### 3. PayPrefund

Sometimes built into validation logic, it ensures that EntryPoint has access to gas fees upfront. The EntryPoint requires the smart account (or paymaster) to prefund gas cost (bundler fees for helping to send userOperations from client to EntryPoint). This prevents a malicious user from submitting userOperations when they cannot afford to pay gas fees.

---

## Transaction Flow

The transaction flow in ERC-4337 follows a specific sequence:

**1. Build & Sign UserOperation**

A frontend (wallet client/smart wallet) builds a UserOperation and the user signs it.

**2. Send to Bundler**

The UserOperation is sent by the client to a bundler, which collects UserOps and submits them to the EntryPoint contract.

**3. Validation**

The EntryPoint calls the smart account's `validateUserOp`. If valid, it calls `execute`.

**4. Gas Settlement**

The EntryPoint settles gas fees: either from the account's prefunds or through a paymaster that sponsors the transaction.

**5. Bundler Reimbursement**

The bundler is reimbursed for including the userOperation.

---

## Smart Wallets

A smart wallet is the user-facing client layer that lets people interact with smart accounts. Its main responsibilities are to:

- Build UserOperations
- Sign them with the account's key logic
- Send them to bundlers for execution through the EntryPoint

There are two broad categories of smart wallets:

**General-purpose smart wallets**
These are designed to serve many different use cases, much like MetaMask does for EOAs. Examples include Coinbase Smart Wallet or Alchemy's Smart Wallet. They provide a familiar, flexible interface but are not deeply specialized.

**Custom smart wallets**
These go beyond the basics by tailoring smart account behavior to specific needs. For instance, a custom wallet could enforce parental spending limits, manage shared team funds with built-in rules, or optimize gas for gaming transactions.

Two libraries currently simplify building custom smart wallets:

- **viem**: Provides the `toSmartAccount` utility, which converts a custom account smart contract into a standard object that follows ERC-4337 flows
- **Permissionless.js** (pimlico): Provides the `createSmartAccountClient` utility that takes the standard object gotten from viem and uses it to create a specialized smart account client. It configures bundlers, paymasters and signing out of the box

---

## Use Cases for Custom Smart Wallets

Now that we understand how smart accounts work under ERC-4337, the real question is: what makes custom smart wallets worth building? Their value comes from programmability.

Unlike EOAs, which are limited to sending ETH or signing transactions, custom smart wallets can enforce rules, automate flows, and adapt to specific needs.

### Personal Automation

Smart wallets can automate financial routines in ways EOAs never could.

- **Recurring Payments**: Subscriptions (Netflix, SaaS, donations) can be set to auto-renew directly from the wallet
- **Spending Limits**: Parents can configure wallets with daily/weekly caps for children
- **Gasless Transactions**: With paymasters, users interact with apps without needing ETH — useful for onboarding new crypto users

```solidity
// Example: Spending limit implementation
mapping(address => uint256) public dailyLimit;
mapping(address => uint256) public spentToday;
mapping(address => uint256) public lastResetTime;

function execute(address to, uint256 value, bytes calldata data) external {
    if (block.timestamp >= lastResetTime[msg.sender] + 1 days) {
        spentToday[msg.sender] = 0;
        lastResetTime[msg.sender] = block.timestamp;
    }
    
    require(
        spentToday[msg.sender] + value <= dailyLimit[msg.sender],
        "Daily limit exceeded"
    );
    
    spentToday[msg.sender] += value;
    
    (bool success,) = to.call{value: value}(data);
    require(success);
}
```

### Team & Collaboration

Custom wallets allow teams and groups to manage shared assets with built-in accountability.

- **Task-Based Payments**: Contributors can be automatically paid when a task is completed
- **DAO Treasuries**: Multi-sig logic can be extended to role-based approvals
- **Escrowed Budgets**: Funds can be unlocked gradually as milestones are reached

```solidity
// Example: Milestone-based treasury
struct Milestone {
    uint256 amount;
    address recipient;
    bool approved;
    bool paid;
}

mapping(uint256 => Milestone) public milestones;
address public projectManager;

function approveMilestone(uint256 milestoneId) external {
    require(msg.sender == projectManager, "Only PM");
    milestones[milestoneId].approved = true;
}

function claimMilestone(uint256 milestoneId) external {
    Milestone storage m = milestones[milestoneId];
    require(m.approved && !m.paid, "Not claimable");
    require(msg.sender == m.recipient, "Not recipient");
    
    m.paid = true;
    payable(m.recipient).transfer(m.amount);
}
```

### DeFi Integration

DeFi users benefit from the ability to batch, sequence, and secure transactions.

- **One-Click Actions**: Instead of 4–5 separate approvals and swaps, a single UserOperation can deposit into a vault, stake LP tokens, and set up auto-harvesting
- **Auto-Rebalancing**: Wallets can enforce portfolio allocations
- **Gas Efficiency**: Bundling multiple operations into one reduces fees

```solidity
// Example: Batched DeFi operations
function executeBatch(Call[] calldata calls) external {
    require(msg.sender == address(entryPoint), "Only EntryPoint");
    
    for (uint256 i = 0; i < calls.length; i++) {
        (bool success,) = calls[i].target.call{
            value: calls[i].value
        }(calls[i].data);
        require(success, "Batch call failed");
    }
}

struct Call {
    address target;
    uint256 value;
    bytes data;
}
```

---

## Building a Custom Smart Wallet

Now that we understand how smart accounts work under ERC-4337, let's look at how to actually build a custom smart wallet. A custom wallet combines three layers:

1. **Smart Account Contract** (on-chain logic)
2. **Account Wrapper** (client-side translation with Viem)
3. **Smart Account Client** (bundler/paymaster integration with Permissionless.js)

### Step 1: Smart Account Contract

The foundation is the contract itself. A minimal smart account only needs the three core functions (`validateUserOp`, `execute`, and prefunding logic), but this is also where you add your own rules.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@account-abstraction/contracts/interfaces/IAccount.sol";
import "@account-abstraction/contracts/interfaces/IEntryPoint.sol";

contract CustomSmartAccount is IAccount {
    IEntryPoint public immutable entryPoint;
    address public owner;
    
    constructor(IEntryPoint _entryPoint, address _owner) {
        entryPoint = _entryPoint;
        owner = _owner;
    }
    
    function validateUserOp(
        UserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external override returns (uint256) {
        require(msg.sender == address(entryPoint), "Only EntryPoint");
        
        bytes32 hash = userOpHash.toEthSignedMessageHash();
        require(hash.recover(userOp.signature) == owner, "Invalid sig");
        
        if (missingAccountFunds > 0) {
            (bool success,) = payable(msg.sender).call{
                value: missingAccountFunds
            }("");
            require(success);
        }
        
        return 0;
    }
    
    function execute(
        address dest,
        uint256 value,
        bytes calldata func
    ) external {
        require(msg.sender == address(entryPoint), "Only EntryPoint");
        (bool success, bytes memory result) = dest.call{value: value}(func);
        require(success, string(result));
    }
    
    receive() external payable {}
}
```

### Step 2: Wrapping with Viem

Once your account contract is deployed, the frontend needs to understand it as a proper ERC-4337 smart account. Viem provides a `toSmartAccount` utility that takes in your contract's address, signing logic, and encoding logic and outputs a standard smart account object.

```typescript
import { toSmartAccount } from 'viem/account-abstraction'
import { privateKeyToAccount } from 'viem/accounts'

const owner = privateKeyToAccount('0x...')

const smartAccount = await toSmartAccount({
  client: publicClient,
  entryPoint: {
    address: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
    version: '0.6',
  },
  address: '0x...', // Your deployed smart account address
  
  async encodeCalls(calls) {
    return encodeFunctionData({
      abi: smartAccountAbi,
      functionName: 'execute',
      args: [calls[0].to, calls[0].value, calls[0].data]
    })
  },
  
  async getFactoryArgs() {
    return {
      factory: '0x...',
      factoryData: '0x...'
    }
  },
  
  async sign({ hash }) {
    return owner.sign({ hash })
  }
})
```

### Step 3: Creating the Client with permissionless.js

Pimlico's `permissionless.js` library turns that smart account object into a working wallet client with its `createSmartAccountClient` function.

```typescript
import { createSmartAccountClient } from 'permissionless'
import { createPimlicoClient } from 'permissionless/clients/pimlico'

const bundlerClient = createPimlicoClient({
  transport: http('https://api.pimlico.io/v2/sepolia/rpc?apikey=...'),
  entryPoint: {
    address: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
    version: '0.6',
  },
})

const smartAccountClient = createSmartAccountClient({
  account: smartAccount,
  chain: sepolia,
  bundlerTransport: http('https://api.pimlico.io/v2/sepolia/rpc?apikey=...'),
  paymaster: bundlerClient,
  userOperation: {
    estimateFeesPerGas: async () => {
      return (await bundlerClient.getUserOperationGasPrice()).fast
    }
  }
})
```

### Step 4: Wiring it to the Frontend

Finally, the wallet is exposed through your dApp's frontend. Instead of sending raw Ethereum transactions, your UI now builds UserOperations.

```typescript
async function sendTransaction() {
  const txHash = await smartAccountClient.sendTransaction({
    to: '0x...',
    value: parseEther('0.1'),
    data: '0x'
  })
  
  const receipt = await smartAccountClient.waitForUserOperationReceipt({
    hash: txHash
  })
}

async function batchOperations() {
  const txHash = await smartAccountClient.sendTransactions({
    transactions: [
      {
        to: tokenAddress,
        data: encodeFunctionData({
          abi: erc20Abi,
          functionName: 'approve',
          args: [spenderAddress, maxUint256]
        })
      },
      {
        to: dexAddress,
        data: encodeFunctionData({
          abi: dexAbi,
          functionName: 'swap',
          args: [tokenIn, tokenOut, amountIn]
        })
      }
    ]
  })
}
```

You can check out my [live implementation of a Custom Wallet for personal accountability](https://github.com/Stoneybro/kairos-frontend).

## Conclusion

Custom smart wallets redefine what it means to interact with blockchain. By moving beyond externally owned accounts (EOAs), developers gain full control over how accounts are structured, validated, and extended. ERC-4337 provides the foundation, while libraries like viem and Permissionless.js lower the barrier to experimentation.

Smart wallets open up new ways to design user-friendly, secure, and specialized experiences.

We are still early. Today's implementations resemble the early days of MetaMask and EOAs — useful, but limited. As the ecosystem matures, we'll see smart wallets become the default, powering dapps, games, organizations, and financial systems with richer, safer interactions.

For developers, this is an open playground. Whether you're building a general-purpose wallet or a highly opinionated one tailored to your product, the tools are in your hands.

**The future of wallets is programmable.**
