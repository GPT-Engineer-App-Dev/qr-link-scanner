import React, { useState } from "react";
import { Container, Input, Button, Box, Text, VStack, Flex, Heading, Spinner } from "@chakra-ui/react";
import fetch from "node-fetch";

const UrlScraper = () => {
  const [url, setUrl] = useState("");
  const [scrapedContent, setScrapedContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScrape = async () => {
    setLoading(true);
    setError(null);
    setScrapedContent(null);

    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to scrape the URL");
      }

      const data = await response.json();
      setScrapedContent(data.content);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <Flex as="nav" width="100%" p={4} bg="teal.500" color="white" justifyContent="center">
        <Heading size="md">URL Scraper</Heading>
      </Flex>
      <VStack spacing={4} mt={8} width="100%">
        <Input
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          size="lg"
        />
        <Button onClick={handleScrape} colorScheme="teal" size="lg" isFullWidth>
          Scrape URL
        </Button>
        {loading && <Spinner size="xl" />}
        {error && (
          <Box mt={4} p={4} borderWidth="1px" borderRadius="lg" borderColor="red.500">
            <Text color="red.500">{error}</Text>
          </Box>
        )}
        {scrapedContent && (
          <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
            <Text>{scrapedContent}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default UrlScraper;