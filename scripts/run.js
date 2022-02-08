const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();


    /* let waveCount;
    //map to store sender address and number of waves
    let allWavedTransactions = new Map();

    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave();
    await waveTxn.wait();
    
    waveCount = await waveContract.getTotalWaves();
    allWavedTransactions.set(waveTxn.address, waveCount);
    //waveTxn = await waveContract.connect(randomPerson).wave();
    //await waveTxn.wait();

    
    for (let i = 0; i < 100; i++) {
        //randon person waves 
        waveTxn = await waveContract.connect(randomPerson).wave();
        await waveTxn.wait();
        
        let numberOfWaves = 1;
        //logic to update number of waves a sender does
        if (allWavedTransactions.has(waveTxn.address)) {
            numberOfWaves = allWavedTransactions.get(waveTxn.address);
            numberOfWaves++;
            allWavedTransactions.set(waveTxn.address, numberOfWaves);
        } else {
            allWavedTransactions.set(waveTxn.address, numberOfWaves);
        }
    }
    console.log(allWavedTransactions);
    waveCount = await waveContract.getTotalWaves(); */
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();