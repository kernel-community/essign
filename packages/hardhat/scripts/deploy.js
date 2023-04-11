
const hre = require('hardhat')

async function main () {
  const network = await hre.ethers.provider.getNetwork()
  console.log(`network: ${network.name}`)

  let [deployer, wallet] = await ethers.getSigners()
  wallet = wallet.address

  console.log('Using wallet address:', wallet)
  const addresses = {}
  addresses.wallet = wallet

  addresses.network = network.name

  console.log('Deploying contract with the account:', deployer.address)
  console.log('Account balance:',
    (await deployer.getBalance() / 1e18).toString(),
    network.name, 'ETH')

  const SignatureNFT = await hre.ethers.getContractFactory('SignatureNFT')
  const signatureNFT = await SignatureNFT.deploy(wallet)
  await signatureNFT.deployed()
  console.log('Essign deployed to:', signatureNFT.address)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
