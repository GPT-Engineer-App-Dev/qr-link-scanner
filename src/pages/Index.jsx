import React, { useState, useEffect } from "react";
import { Container, Text, VStack, Button, Box, Link, Flex, Heading } from "@chakra-ui/react";
import { Html5QrcodeScanner } from "html5-qrcode";

const Index = () => {
  const [scanResult, setScanResult] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    if (showScanner) {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: 250 },
        false
      );

      scanner.render(
        (decodedText) => {
          setScanResult(decodedText);
          setShowScanner(false);
          scanner.clear();
        },
        (error) => {
          console.error(error);
        }
      );

      return () => {
        scanner.clear();
      };
    }
  }, [showScanner]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Flex as="nav" width="100%" p={4} bg="teal.500" color="white" justifyContent="center">
        <Heading size="md">QR Code Scanner</Heading>
      </Flex>
      <VStack spacing={4} mt={8}>
        <Text fontSize="2xl">Scan a QR Code</Text>
        <Button onClick={() => setShowScanner(!showScanner)}>
          {showScanner ? "Hide Scanner" : "Show Scanner"}
        </Button>
        {showScanner && (
          <Box width="100%" maxW="400px" id="qr-reader" />
        )}
        {scanResult && (
          <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
            <Text>Scanned Link:</Text>
            <Link href={scanResult} color="teal.500" isExternal>
              {scanResult}
            </Link>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;