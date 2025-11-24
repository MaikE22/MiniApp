'use client';

import { useState } from 'react';
import { Title, Text, Button, Container, Paper, Group, SimpleGrid } from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';

const rarities = [
  { name: 'Cosmic', percentage: '1%', color: '#ff00ff' },
  { name: 'Aura', percentage: '4%', color: '#00ffff' },
  { name: 'Neon', percentage: '24%', color: '#00ff00' },
  { name: 'Base', percentage: '71%', color: '#ffffff' },
];

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
      <Paper withBorder shadow="md" p={30} radius="md" style={{ backgroundColor: '#1a1b1e', border: '1px solid #343541' }}>
        <Title order={1} style={{ color: '#00ff00', textAlign: 'center', marginBottom: '1rem' }}>
          Neon Origins
        </Title>
        <Text size="lg" style={{ color: '#c1c2c5', textAlign: 'center', marginBottom: '2rem' }}>
          Mint your unique ERC721 token.
        </Text>

        <SimpleGrid cols={2} spacing="lg" style={{ marginBottom: '2rem' }}>
          {rarities.map((rarity) => (
            <Paper key={rarity.name} withBorder p="md" radius="sm" style={{ backgroundColor: '#2c2e33', textAlign: 'center' }}>
              <Text style={{ color: rarity.color, fontWeight: 700 }}>{rarity.name}</Text>
              <Text size="sm" style={{ color: '#a6a7ab' }}>{rarity.percentage}</Text>
            </Paper>
          ))}
        </SimpleGrid>

        <Group grow>
          <Button
            variant="outline"
            color="cyan"
            size="lg"
            style={{ borderColor: '#00ff00', color: '#00ff00' }}
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
