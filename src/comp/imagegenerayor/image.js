import React, { useState } from "react";

const API_TOKEN = "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";

const ImageGenerationForm = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (<div className="container al-c mt-3">
    <h1 style={{fontSize:"50px" , fontWeight:"500"}}>Ai Image  <span style={{color:"#E75480"}}>Generator</span></h1>
    <form className="gen-form" onSubmit={handleSubmit}>
      <div>
      <input type="text" name="input" style={{height:"40px", width:"700px",borderRadius:"24px", fontSize:"15px"}} placeholder="Describe Pic" />
      <button type="submit" style={{height:"45px",width:"70px",borderRadius:"24px", backgroundColor:"#E75480"}}>Generate</button>
      </div>
    </form>
    <br/>
    <br/>
    <div>
    {loading && <div className="loading">Loading...</div>}
    {!loading && output && (
      <div className="result-image">
        <img src={output} alt="art"  style={{height:"450px",width:"500px"}}/>
      </div>
    )}
    </div>

    </div>);
  
};

export default ImageGenerationForm;