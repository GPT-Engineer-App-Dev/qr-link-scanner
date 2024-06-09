import React, { useState } from "react";
import { Container, Input, Button, Box, Text, VStack, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";

const Scraper = () => {
  const [url, setUrl] = useState("");
  const [scrapedContent, setScrapedContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScrape = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:5000/api/scrape", { url });
      setScrapedContent(response.data.content);
    } catch (err) {
      setError("Failed to scrape the URL");
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
        />
        <Button onClick={handleScrape} isLoading={loading}>
          Scrape URL
        </Button>
        {error && (
          <Box mt={4} p={4} borderWidth="1px" borderRadius="lg" borderColor="red.500">
            <Text color="red.500">{error}</Text>
          </Box>
        )}
        {scrapedContent && (
          <Box mt={4} p={4} borderWidth="1px" borderRadius="lg" width="100%">
            <Text>{scrapedContent}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Scraper;