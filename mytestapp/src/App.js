import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  // const url = "https://alltheclouds.com.au/api/Products";
  const url = "http://localhost:5057/api/getproducts";
  const [data, setData] = useState([]);
  const apiData =  [
    {
      "productId": "100AC-001",
      "name": "Cumulus",
      "description": "Cumulus clouds are clouds which have flat bases and are often described as \"puffy\", \"cotton-like\" or \"fluffy\" in appearance.",
      "unitPrice": 10.98,
      "maximumQuantity": null
    },
    {
      "productId": "100AC-002",
      "name": "Stratus",
      "description": "Stratus hang low in the sky as a flat, featureless, uniform layer of grayish cloud. It resembles fog that hugs the horizon (instead of the ground).",
      "unitPrice": 12.34,
      "maximumQuantity": null
    },
    {
      "productId": "100AC-003",
      "name": "Stratocumulus",
      "description": "Low, puffy, grayish or whitish clouds that occur in patches with blue sky visible in-between. When viewed from underneath, stratocumulus have a dark honeycomb appearance. ",
      "unitPrice": 238.55,
      "maximumQuantity": null
    },
    {
      "productId": "100AC-004",
      "name": "Altocumulus",
      "description": "Altocumulus clouds are the most common clouds of the middle atmosphere. They look like the wool of sheep or scales of mackerel fish -- hence their nicknames \"sheep backs\" and \"mackerel skies.\"",
      "unitPrice": 0.99,
      "maximumQuantity": 100
    },
    {
      "productId": "100AC-005",
      "name": "Nimbostratus",
      "description": "Nimbostratus clouds cover the sky in a dark gray layer. They can extend from the low and middle layers of the atmosphere and are thick enough to blot out the sun.",
      "unitPrice": 68.03,
      "maximumQuantity": null
    },
    {
      "productId": "100AC-006",
      "name": "Altostratus",
      "description": "Altostratus appear as gray or bluish-gray sheets of cloud that partially or totally cover the sky at mid-levels.",
      "unitPrice": 15.21,
      "maximumQuantity": 10
    },
    {
      "productId": "100AC-007",
      "name": "Cirrocumulus",
      "description": "Cirrocumulus clouds are small, white patches of clouds often arranged in rows that live at high altitudes and are made of ice crystals.",
      "unitPrice": 82.84,
      "maximumQuantity": 20
    },
    {
      "productId": "100AC-008",
      "name": "Cirrostratus",
      "description": "Cirrostratus clouds are transparent, whitish clouds that veil or cover nearly the entire sky.",
      "unitPrice": 114.68,
      "maximumQuantity": null
    },
    {
      "productId": "100AC-009",
      "name": "Cirrus",
      "description": "Like their name (which is Latin for \"curl of hair\") suggests, cirrus are thin, white, wispy strands of clouds that streaks across the sky.",
      "unitPrice": 12.95,
      "maximumQuantity": null
    }
  ];
  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d))
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="App">
      <h2 style={{ color: "green", marginLeft:"10px" }}>Product List</h2>
        {data.map((dataObj, index) => {
          return (
            <div
              style={{
                width: "32%",
                minHeight:"20em",
                marginLeft:"10px",
                backgroundColor: "#80ccf0",
                borderRadius: 5,
                marginBlock: 5,
                float:"left"
              }}
            >
              <h2 style={{ color:"white",padding:"2px" }}>{dataObj.name}</h2>
              <h3 style={{ fontSize: 12, color:"white", padding:"2px"}}>Product ID {dataObj.productId}</h3>
              <h4 style={{ padding:"2px"}}>Price {dataObj.unitPrice.toFixed(2)}</h4>
             
              {dataObj.maximumQuantity!=null &&  <h4 style={{  color:"green", padding:"2px"}}>In Stock {dataObj.maximumQuantity}</h4>}
              {dataObj.maximumQuantity==null &&  <h4 style={{  color:"red", padding:"2px"}}>Out of Stock</h4>}

              <p style={{ fontSize: 12, color:"black", padding:"2px"}}>{dataObj.description}</p>



            </div>
          );
        })}
    </div>
  );
}

export default App;