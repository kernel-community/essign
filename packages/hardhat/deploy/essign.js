module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments
  let { deployer } = await getNamedAccounts()

  let creator = '0x7DAC9Fc15C1Db4379D75A6E3f330aE849dFfcE18'

  const network = await hre.ethers.provider.getNetwork()
  console.log(`network: ${network.name}`)
  if (network.name === 'goerli') {
    creator = '0x1D32F2aCB832AFc3D8c8ffB3BE20e8dC7Faac507'
  }
  await deploy('Essign', {
    from: deployer,
    args: [creator],
    log: true
  })
}
module.exports.tags = ['Essign']