const Web3 = require("web3");
const contractAbi = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_manufacturer","type":"string"},{"internalType":"string","name":"_qrCode","type":"string"}],"name":"registerProduct","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_qrCode","type":"string"}],"name":"verifyProduct","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_qrCode","type":"string"}],"name":"markProductAsFake","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const contractAddress = "0x6c6809F7ab413A363234ab70a736555A731899c9";
const web3 = new Web3("http://127.0.0.1:7545"); // or the address of your Ganache instance
const productRegistry = new web3.eth.Contract(contractAbi, contractAddress);

const options = {
    gasLimit: 1000000000,
  };

// call the registerProduct function to register a new product
async function registerProduct(name, manufacturer, qrCode) {
  await productRegistry.methods.registerProduct(name, manufacturer, qrCode).send({ from: "0x909C82787B1E3ADF7570B6a61b65b2B257Bc22Bd",gas:300000 });
  console.log("Product registered successfully!");
}

// call the verifyProduct function to verify if a product is authentic
async function verifyProduct(qrCode) {
  const isAuthentic = await productRegistry.methods.verifyProduct(qrCode).call();
  console.log(`Product is ${isAuthentic ? "authentic" : "fake"}.`);
}

// call the markProductAsFake function to mark a product as fake
async function markProductAsFake(qrCode) {
  await productRegistry.methods.markProductAsFake(qrCode).send({ from: "0x909C82787B1E3ADF7570B6a61b65b2B257Bc22Bd", gas:300000 });
  console.log("Product marked as fake.");
}

// example usage
//registerProduct("IPhone14","Apple.inc","123456")
//markProductAsFake("12345678");
verifyProduct("12345678");
