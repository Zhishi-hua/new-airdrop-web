import { Box } from "@chakra-ui/react";
import TodaySection from "./today";
import TrailerSection from "./trailer";

function Home() {
  return (
    <Box>
      <TodaySection />
      <TrailerSection />
    </Box>
  );
}

export default Home;
