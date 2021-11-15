import "./App.css";
import { FormatQuote, Twitter, Facebook, Loop } from "@mui/icons-material";
import { IconButton, Paper } from "@mui/material";
import { Box } from "@mui/system";
import randomMC from "random-material-color";
import { useEffect, useState } from "react";

const App = () => {
  const [color, setColor] = useState("");

  useEffect(() => {
    let effect = true;
    setColor(randomMC.getColor());
    return () => {
      effect = false;
    };
  }, []);

  return (
    <Box className="Layout" bgcolor={color}>
      <Box id="quote-box" className="QuoteBox" component={Paper}>
        <Box pb={10}>
          <IconButton id="new-quote" aria-label="fingerprint" color="secondary">
            <Loop />
          </IconButton>
        </Box>
        <Box id="text">
          <Box color={color}>
            <FormatQuote fontSize="medium" /> In order to succeed, your desire
            for success should be greater than your fear of failure.
          </Box>
        </Box>
        <Box id="author">— Tony Hsieh</Box>

        <a id="tweet-quote" href="twitter.com/intent/tweet">
          <IconButton aria-label="twitter" color="primary">
            <Twitter />
          </IconButton>
        </a>

        <a id="facebook-quote" href="facebook.com">
          <IconButton aria-label="facebook" color="primary">
            <Facebook />
          </IconButton>
        </a>
      </Box>
    </Box>
  );
};

export default App;
