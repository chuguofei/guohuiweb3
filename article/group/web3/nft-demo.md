---
title: 基于web3搭建一个本地NTF项目
description: 使用 vite.js + react + solidity + ether.js + hardhat 搭建的一个内部以太网筹币项目
date: 2023-06-11
cover: https://guohuiweb3site.oss-cn-beijing.aliyuncs.com/ce1f7e86bd6f00ed33d2f5143e1b22b.png

public: true

tags:
  - react
  - web3
  - 去中心化
  - solidity
  - ether.js
  - hardhat

group: web3
sort: 2
---

# 如何搭建在本地搭建一个 ntf 项目

本文章使用 vite.js + react + solidity + ether.js + hardhat 搭建的一个内部以太网筹币项目

本文章省略页面布局过程，只列举主要代码。

::: danger

在部署合约前，需要安装小狐狸钱包。

:::

## 创建项目添加依赖

1. 使用 vite 官网创建一个 react 项目

2. 安装 web3 所需要的依赖包

```shell
pnpm install ethers hardhat @nomiclabs/hardhat-ethers @nomiclabs/hardhat-waffle
```

## 创建 solidity 文件

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Adulam is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string baseURI; // NFT元数据的基本URI
    string public baseExtension = ".json"; // NFT元数据文件的扩展名
    string public baseImage = ".webp"; // NFT图像文件的扩展名
    uint256 public cost = 0.001 ether; // 铸造每个NFT代币所需的费用
    uint256 public maxSupply = 99; // NFT代币的最大供应量
    bool public paused = false; // 铸造功能是否暂停

    event Sale(
        uint256 id,
        address indexed buyer,
        uint256 cost,
        string indexed tokenURI,
        uint256 timestamp
    );

    struct SaleStruct {
        uint256 id; // NFT代币的ID
        address buyer; // 购买者的地址
        uint256 cost; // 购买NFT代币的费用
        string imageURL; // NFT代币的图像URL
        uint256 timestamp; // 购买的时间戳
    }

    SaleStruct[] minted; // 已铸造的NFT代币数组

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI
    ) ERC721(_name, _symbol) {
        setBaseUrl(_initBaseURI); // 设置初始的基本URI
    }

    function payToMint() public payable {
        uint256 supply = totalSupply(); // 已铸造的NFT代币数量
        require(!paused, "NFTs under maintenance!"); // 检查铸造功能是否暂停
        require(supply <= maxSupply, "Sorry, all NFTs have been minted!"); // 检查是否已经达到最大供应量
        require(msg.value > 0 ether, "Ether too low for minting!"); // 检查支付的以太币是否足够

        // 判断当前调用合约的用户是否为合约所有者
        if (msg.sender != owner()) {
            require(msg.value >= cost); // 检查支付的费用是否足够
        }

        _safeMint(msg.sender, supply + 1); // 铸造新的NFT代币

        // 将新铸造的NFT代币信息添加到minted数组中
        minted.push(
            SaleStruct(
                supply + 1,
                msg.sender, // 调用者
                msg.value, // 以太币
                toImage(supply + 1),
                block.timestamp
            )
        );

        // 向网页发送事件
        emit Sale(
            supply,
            msg.sender,
            msg.value,
            tokenURI(supply + 1),
            block.timestamp
        ); // 触发Sale事件
    }

    // 根据图片地址拼接最新的 收藏品
    function toImage(uint256 tokenId) internal view returns (string memory) {
        string memory currentBaseURI = _baseURI(); // 获取当前的基本URI
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseImage
                    )
                )
                : ""; // 返回代币的图像URL
    }

    function getAllNFTs() public view returns (SaleStruct[] memory) {
        return minted; // 返回所有已铸造的NFT代币的信息数组
    }

    function getAnNFTs(
        uint256 tokenId
    ) public view returns (SaleStruct memory) {
        return minted[tokenId - 1]; // 根据给定的tokenId返回相应的NFT代币信息
    }

    function setBaseUrl(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI; // 设置基本URI
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI; // 返回基本URI
    }
}


```

## 创建 hardhat.config.js

官网: <https://learnblockchain.cn/>

::: tip

Hardhat 内置了 Hardhat Network，这是一个为开发而设计的本地以太坊网络。它允许你部署合约，运行测试和调试代码。

:::

**<font color='red'> 使用 hardhat 工具创建本地以太坊网络 </font>**

```js
// 引入必要的库和模块
require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  // 默认使用的网络是本地节点
  defaultNetwork: 'localhost',
  // 配置网络选项
  networks: {
    hardhat: {}, // Hardhat网络配置为空对象，使用默认配置
    localhost: {
      url: 'http://127.0.0.1:8545', // 本地节点的URL
    },
    goerli: {
      url: process.env.ENDPOINT_URL, // Goerli 网络的URL，从环境变量中获取
      accounts: [process.env.DEPLOYER_KEY], // 使用环境变量中的部署者密钥作为账户
    },
  },
  // Solidity合约编译器配置
  solidity: {
    version: '0.8.18', // 使用的Solidity版本
    settings: {
      optimizer: {
        enabled: true, // 启用优化器
        runs: 200, // 运行优化器的次数
      },
    },
  },
  // 文件路径配置
  paths: {
    sources: './src/contracts', // Solidity合约源文件路径
    artifacts: './src/abis', // 编译后的合约构件文件路径
  },
  // Mocha测试框架配置
  mocha: {
    timeout: 40000, // 设置测试超时时间为40秒
  },
};
```

## 使用 hardhat 创建一个 rpc 本地服务

```shell

yarn hardhat node

```

## 初始化合约

**运行下面命令，会启动部署脚本，它会调用智能合约工厂的 deploy 方法，部署一个智能合约。**

```shell

yarn hardhat run scripts/deploy.js --network localhost

```

## 在 小狐狸钱包上 创建一个本地以太网

![](https://guohuiweb3site.oss-cn-beijing.aliyuncs.com/mark-localhost.png)

## 完成部署

经过前面的操作就可以在本地搭建了一个 ntf 项目，连接上小狐狸钱包，就可以和以太网交互啦。
