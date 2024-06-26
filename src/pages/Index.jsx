import React, { useState } from 'react';
import { Container, VStack, Button, Grid, GridItem, Text, Box } from "@chakra-ui/react";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    calculateWinner(newBoard);
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (board.every(cell => cell)) {
      setWinner('Draw');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Tic Tac Toe</Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          {board.map((value, index) => (
            <GridItem key={index} w="80px" h="80px">
              <Button w="100%" h="100%" onClick={() => handleClick(index)} fontSize="2xl">
                {value}
              </Button>
            </GridItem>
          ))}
        </Grid>
        {winner && (
          <Box>
            <Text fontSize="xl" mt={4}>{winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`}</Text>
            <Button mt={2} onClick={resetGame}>Restart Game</Button>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;