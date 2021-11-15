import "./App.css";
import { FormatQuote, Twitter, Facebook, Loop } from "@mui/icons-material";
import { IconButton, Paper } from "@mui/material";
import { Box } from "@mui/system";
import randomMC from "random-material-color";
import { useEffect, useState } from "react";

const App = () => {
  const [color, setColor] = useState("");
  const [data, setData] = useState<any>();
  const HOME_URL = "https://fetahokey.github.io/random-quote-machine/";

  const updateQuote = async () => {
    /*
    author: "Samuel Taylor Coleridge"
    authorSlug: "samuel-taylor-coleridge"
    content: "Love is flower like; Friendship is like a sheltering tree."
    dateAdded: "2020-02-27"
    dateModified: "2020-02-27"
    length: 58
    tags: ['friendship']
    _id: "LpBt1VcHO"
    */
    try {
      const response = await fetch("https://api.quotable.io/random");
      const { statusCode, statusMessage, ...data } = await response.json();
      if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
      console.log(data);
      setData(data);
      setColor(randomMC.getColor());
    } catch (error) {
      // If the API request failed, log the error to console and update state
      // so that the error will be reflected in the UI.
      console.error(error);
      setData({ content: "Opps... Something went wrong" });
    }
  };

  useEffect(() => {
    let effect = true;

    updateQuote();

    return () => {
      // eslint-disable-next-line
      effect = false;
    };
  }, []);

  return (
    <Box className="Layout" bgcolor={color}>
      <Box id="quote-box" className="QuoteBox" component={Paper}>
        <Box pb={10}>
          <IconButton
            id="new-quote"
            aria-label="fingerprint"
            color="secondary"
            onClick={updateQuote}
          >
            <Loop />
          </IconButton>
        </Box>
        <Box id="text">
          <Box color={color}>
            <FormatQuote fontSize="medium" /> {data?.content}
          </Box>
        </Box>
        <Box id="author">— {data?.author}</Box>

        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?hashtags=quotes,fetahokey&related=fatahokey&text=${data?.content} \n ${HOME_URL}`}
        >
          <IconButton aria-label="twitter" color="primary">
            <Twitter />
          </IconButton>
        </a>

        <a
          id="facebook-quote"
          href={`https://www.facebook.com/sharer/sharer.php?u=${HOME_URL}`}
        >
          <IconButton aria-label="facebook" color="primary">
            <Facebook />
          </IconButton>
        </a>
      </Box>
    </Box>
  );
};

export default App;
