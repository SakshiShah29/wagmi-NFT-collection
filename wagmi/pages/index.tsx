import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useAccount, useBalance, useConnect, useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { useEffect, useState } from 'react';
import {NFTS_CONTRACT_ADDRESS,abi} from "../constants/index"
import { parseEther } from 'viem';
const Home: NextPage = () => {



 const {address, connector:activeConnector,isConnected}=useAccount();

 const {error}=useConnect();

 const {chain,chains}=useNetwork();

 

 const [hasMounted, setHasMounted] = useState(false);
 useEffect(() => {
   setHasMounted(true);
 }, []);
 if(!hasMounted){
  return null;
 }
 

 /**
   * presaleMint: Mint an NFT during the presale
   */
  const {config}=usePrepareContractWrite({
    address:NFTS_CONTRACT_ADDRESS,
    abi:abi,
    functionName:"presaleMint",
  });
  const {  write,data } = useContractWrite(config);
 
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });


  return (
    <div className={styles.container}>
      <Head>
        <title>RainbowKit App</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <div className='container'>
        <ConnectButton />
        {isConnected?(
          <div>
            <button disabled={!write} onClick={() => write?.()}>Mint</button>
          </div>
        ):(
          <h2>Not Connected</h2>
        )}
        </div>

        <section className='Balance'>
          <h3>
            Balance: {" "}
            <span>
              
            </span>

          </h3>{" "}
        </section>

        {chains && 
        <div className='Current_chain'>
          Current chain:
          {isConnected?(
            <span>{chains.map((chain)=>chain.name)}</span>
          ):("Connect Wallet")}</div>}
        
      </main>

      <p className="error">{error && <span>{error.message}</span>}</p>
      {/* End of component */}
    </div>
  );
};

export default Home;