document.addEventListener("DOMContentLoaded", () => {
    const contractAddress = "0x81Fc10a452E9f93eB2ADeAb2b5fBc79f5767490E";  
    const contractABI = [ 
        {
            "inputs": [{"internalType": "uint256","name": "productId","type": "uint256"}],
            "name": "buyProduct",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        }
    ];

    const buyButtons = document.querySelectorAll(".buy-button");

    buyButtons.forEach((button, index) => {
        button.addEventListener("click", async () => {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    await ethereum.request({ method: 'eth_requestAccounts' });
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    const shopContract = new ethers.Contract(contractAddress, contractABI, signer);

                    const price = button.parentElement.getAttribute("data-price");

                    const tx = await shopContract.buyProduct(index + 1, {
                        value: ethers.utils.parseEther(price)
                    });

                    await tx.wait();
                    alert(`Товар куплен! Hash: ${tx.hash}`);
                } catch (err) {
                    console.error(err);
                    alert("Ошибка при покупке.");
                }
            } else {
                alert("Установите MetaMask!");
            }
        });
    });
});
