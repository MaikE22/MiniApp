'use client';

import { useEffect } from 'react';
import { Title, Text, Button, Container, Paper, Group, Anchor } from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';
import { useModal } from 'connectkit';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useConfig } from 'wagmi';
import { contractAddress, contractAbi } from './constants';

export default function Home() {
  const { address, isConnected } = useAccount();
  const config = useConfig();
  const { setOpen } = useModal();
  const { data: hash, isPending, writeContract, isError: isWriteError, error: writeError } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed, isError: isReceiptError, error: receiptError } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleMint = () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'mint',
      account: address,
      chain: config.chains[0],
    });
  };

  const handleButtonClick = () => {
    if (!isConnected) {
      setOpen(true);
    } else {
      handleMint();
    }
  };

  useEffect(() => {
    if (isConfirming) {
      notifications.show({
        id: 'mint-start',
        loading: true,
        title: 'Minting...',
        message: 'Submitting transaction to the blockchain.',
        autoClose: false,
        withCloseButton: false,
      });
    }

    if (isConfirmed) {
      notifications.update({
        id: 'mint-start',
        color: 'teal',
        title: 'Transaction Successful',
        message: (
          <Anchor href={`https://basescan.org/tx/${hash}`} target="_blank">
            Your Neon Origins NFT has been minted! View on Basescan
          </Anchor>
        ),
        autoClose: 5000,
      });
    }

    if (isWriteError || isReceiptError) {
      notifications.show({
        color: 'red',
        title: 'Transaction Failed',
        message: (writeError?.message || receiptError?.message) || 'An unknown error occurred.',
        autoClose: 5000,
      });
    }
  }, [isConfirming, isConfirmed, hash, isWriteError, isReceiptError, writeError, receiptError]);

  return (
    <Container size="xs" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Notifications />
      <Paper withBorder shadow="md" p={30} radius="md" style={{ backgroundColor: 'transparent', border: '1px solid #343541' }}>
        <Title order={1} className="neon-text-violet" style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Neon Origins
        </Title>
        <Text size="lg" className="neon-text-cyan" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Claim your unique digital artifact.
        </Text>

        <div className="pulsating-orb"></div>

        <Group grow>
          <Button
            className="mint-button"
            onClick={handleButtonClick}
            loading={isPending || isConfirming}
          >
            {isPending ? 'Confirming...' : (isConfirming ? 'Minting...' : 'Mint')}
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
