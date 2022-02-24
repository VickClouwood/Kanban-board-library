import "./App.css";

import React, { Component } from "react";
import Board from "react-trello";

const data = require("http://localhost:3000");

const handleDragStart = (cardId, laneId) => {
  console.log("drag started");
  console.log(`cardId: ${cardId}`);
  console.log(`laneId: ${laneId}`);
};

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
  console.log("drag ended");
  console.log(`cardId: ${cardId}`);
  console.log(`sourceLaneId: ${sourceLaneId}`);
  console.log(`targetLaneId: ${targetLaneId}`);
};

class App extends Component {
  state = { boardData: { lanes: [] } };

  setEventBus = (eventBus) => {
    this.setState({ eventBus });
  };

  componentDidMount() {
    fetch("http://localhost:3000/lanes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ boardData: { lanes: data } });
      });
  }

  //create a function to send a PUT request to the server

  async componentWillMount() {
    const response = await this.getBoard();
    this.setState({ boardData: response });
  }

  getBoard() {
    return new Promise((resolve) => {
      resolve(data);
    });
  }

  // postBoard = (board) => {
  //   fetch("https://my-json-server.typicode.com/VickClouwood/FAKE-API/db", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(board),
  //   });
  // };

  completeCard = () => {
    this.state.eventBus.publish({
      type: "ADD_CARD",
      laneId: "COMPLETED",
      card: {
        id: "Milk",
        title: "Buy Milk",
        label: "15 mins",
        description: "Use Headspace app",
      },
    });
    this.state.eventBus.publish({
      type: "REMOVE_CARD",
      laneId: "PLANNED",
      cardId: "Milk",
    });
  };

  addCard = () => {
    this.state.eventBus.publish({
      type: "ADD_CARD",
      laneId: "BLOCKED",
      card: {
        id: "Ec2Error",
        title: "EC2 Instance Down",
        label: "30 mins",
        description: "Main EC2 instance down",
      },
    });
  };

  shouldReceiveNewData = (nextData) => {
    console.log("New card has been added");
    console.log(nextData);
  };

  handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`);
    console.dir(card);
    this.postCard(card);
  };

  //create a submit button to post the data to the api
  handleSubmit = (e) => {
    e.preventDefault();
    const card = {
      id: "Milk",
      title: "Buy Milk",
      label: "15 mins",
      description: "Use Headspace app",
    };
    this.postCard(card);
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>React Trello Demo</h3>
        </div>
        <div className="App-intro">
          <button onClick={this.completeCard} style={{ margin: 5 }}>
            Complete Buy Milk
          </button>
          <button onClick={this.addCard} style={{ margin: 5 }}>
            Add Blocked
          </button>
          <Board
            editable
            onCardAdd={this.handleCardAdd}
            // onCardPost={this.postCard}
            data={this.state.boardData}
            draggable
            onDataChange={this.shouldReceiveNewData}
            eventBusHandle={this.setEventBus}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
          />
        </div>
      </div>
    );
  }
}

export default App;

// import "./App.css";

// import React, { useEffect, useState } from "react";
// import Board from "react-trello";

// const data = require("./data.json");

// const handleDragStart = (cardId, laneId) => {
//   console.log("drag started");
//   console.log(`cardId: ${cardId}`);
//   console.log(`laneId: ${laneId}`);
// };

// const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
//   console.log("drag ended");
//   console.log(`cardId: ${cardId}`);
//   console.log(`sourceLaneId: ${sourceLaneId}`);
//   console.log(`targetLaneId: ${targetLaneId}`);
// };

// function App() {
//   const [data, setData] = useState({ boardData: { lanes: [] } });
//   // const [boardData, setBoardData] = useState(data);

//   // setEventBus = (eventBus) => {
//   //   setState({ eventBus });
//   // };
//   const [eventBus, setEventBus] = useState(null);

//   useEffect(async () => {
//     const response = await getBoard();
//     setData({ boardData: response });
//   }, []);

//   function getBoard() {
//     return new Promise((resolve) => {
//       resolve(data);
//     });
//   }

//   const completeCard = () => {
//     eventBus.publish({
//       type: "ADD_CARD",
//       laneId: "COMPLETED",
//       card: {
//         id: "Milk",
//         title: "Buy Milk",
//         label: "15 mins",
//         description: "Use Headspace app",
//       },
//     });
//     eventBus.publish({
//       type: "REMOVE_CARD",
//       laneId: "PLANNED",
//       cardId: "Milk",
//     });
//   };

//   const addCard = () => {
//     eventBus.publish({
//       type: "ADD_CARD",
//       laneId: "BLOCKED",
//       card: {
//         id: "Ec2Error",
//         title: "EC2 Instance Down",
//         label: "30 mins",
//         description: "Main EC2 instance down",
//       },
//     });
//   };

//   const shouldReceiveNewData = (nextData) => {
//     console.log("New card has been added");
//     console.log(nextData);
//   };

//   const handleCardAdd = (card, laneId) => {
//     console.log(`New card added to lane ${laneId}`);
//     console.dir(card);
//   };

//   return (
//     <div className="App">
//       <div className="App-header">
//         <h3>React Trello Demo</h3>
//       </div>
//       <div className="App-intro">
//         <button onClick={this.completeCard} style={{ margin: 5 }}>
//           Complete Buy Milk
//         </button>
//         <button onClick={this.addCard} style={{ margin: 5 }}>
//           Add Blocked
//         </button>
//         <Board
//           editable
//           onCardAdd={this.handleCardAdd}
//           data={this.state.boardData}
//           draggable
//           onDataChange={this.shouldReceiveNewData}
//           eventBusHandle={this.setEventBus}
//           handleDragStart={handleDragStart}
//           handleDragEnd={handleDragEnd}
//         />
//       </div>
//     </div>
//   );
// }

// export default App;
