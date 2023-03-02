import { useState, useEffect } from "react";
import axios from "axios";

function Footer() {
  const [fact, setFact] = useState("");
  useEffect(() => {
    const getFact = async () => {
      const data1 = await axios("https://catfact.ninja/fact?max_length=100");
      setFact(data1.data.fact);
    };
    getFact();
  }, []);
  return (
    <footer className="footer">
      <div>
        <p>{fact}</p>
      </div>
    </footer>
  );
}

export default Footer;
