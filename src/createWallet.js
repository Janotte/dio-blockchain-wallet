//--- Importantdo as dependências
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//--- Definindo a rede

// Bitcoin - Rede principal -> mainnet
// const network = bitcoin.networks.mainnet
// Bitcoin - Rede de teste -> test
const network = bitcoin.networks.testnet

//--- Derivação de carteira HD
// const path = `m/49'/0'/0'/0` para mainnet
// const path = `m/49'/1'/0'/0` para testnet
const path = `m/49'/1'/0'/0`

//--- Gerando a mnemonic para a seed (Palavras senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//--- Gerando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//--- Gerando uma conta - Par de chaves Publico, Privada
let account = root.derivePath(path)

//--- Gerando uma conta nó a partir da raiz
let node = account.derive(0).derive(0)

//--- Gerando o endereço
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

//--- Exibindo os dados geradas na carteira
console.log("--------------------------------------- Carteira gerada ---------------------------------------")
console.log(" Endereço      : ", btcAddress)
console.log(" Chave privada : ", node.toWIF())
console.log(" Seed          : ", mnemonic)
console.log("-----------------------------------------------------------------------------------------------")