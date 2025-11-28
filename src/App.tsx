import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import Home from "./views/home";
import History from "./views/history";

function App() {
  return (
    <Box minH="100vh" bg="#1a1a1a" color="white">
      <Box borderBottom="1px solid" borderColor="#374151" bg="#1f2937" w="100%">
        <Header />
      </Box>
      <Box maxW="1400px" mx="auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
