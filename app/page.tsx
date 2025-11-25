'use client';

import { useState } from 'react';
import { Title, Text, Button, Container, Paper, Group } from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    setLoading(true);
    notifications.show({
      id: 'mint-start',
      loading: true,
      title: 'Minting...',
      message: 'Submitting transaction to the blockchain.',
      autoClose: false,
      withCloseButton: false,
    });

    // Simulate a delay for the transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));

    notifications.update({
      id: 'mint-start',
      color: 'teal',
      title: 'Transaction Successful',
      message: 'Your Neon Origins NFT has been minted!',
      autoClose: 5000,
    });
    setLoading(false);
  };

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
            onClick={handleMint}
            loading={loading}
          >
            Mint
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
