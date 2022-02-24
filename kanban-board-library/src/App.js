import "./App.css";
import React, { useState, useEffect } from "react";
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

function App() {
  const [state, setState1] = React.useState({
    boardData: { lanes: [] },
  });
  // state = { boardData: { lanes: [] } };

  const setEventBus = (eventBus) => {
    setState1({ eventBus });
  };

  // componentDidMount() {
  //   fetch("http://localhost:3000/lanes")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       this.setState({ boardData: { lanes: data } });
  //     });
  // }

  useEffect(() => {
    fetch("http://localhost:3000/lanes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setState1({ boardData: { lanes: data } });
      });
  }, []);

  // create a PUT request to the server when we add a new card
  function postCard(card) {
    fetch("http://localhost:3000/lanes/PLANNED", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setState1({ boardData: { lanes: { PLANNED: data } } });
      });
  }

  // create a delete request to delete a card from api
  // const deleteCard = (cardId) => {
  //   fetch(`http://localhost:3000/lanes/${cardId}`, {
  //     method: "DELETE",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setState1({ ...data, boardData: { lanes: data } });
  //     });
  // };

  // async componentWillMount() {
  //   const response = await this.getBoard();
  //   this.setState({ boardData: response });
  // }

  async function abc() {
    const response = await this.getBoard();
    setState1({ boardData: response });
  }

  useEffect(() => {
    abc();
  }, []);

  function getBoard() {
    return new Promise((resolve) => {
      resolve(data);
    });
  }

  const completeCard = () => {
    state.eventBus.publish({
      type: "ADD_CARD",
      laneId: "COMPLETED",
      card: {
        id: "Milk",
        title: "Buy Milk",
        label: "15 mins",
        description: "Use Headspace app",
      },
    });
    state.eventBus.publish({
      type: "REMOVE_CARD",
      laneId: "PLANNED",
      cardId: "Milk",
    });
  };

  const addCard = () => {
    state.eventBus.publish({
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

  const shouldReceiveNewData = (nextData) => {
    console.log("New card has been added");
    console.log(nextData);
  };

  const handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`);
    console.dir(card);
    postCard(card);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h3>React Trello Demo</h3>
      </div>
      <div className="App-intro">
        <button onClick={completeCard} style={{ margin: 5 }}>
          Complete Buy Milk
        </button>
        <button onClick={addCard} style={{ margin: 5 }}>
          Add Blocked
        </button>
        <Board
          editable
          onCardAdd={handleCardAdd}
          data={state.boardData}
          // onCardDelete={deleteCard}
          draggable
          onDataChange={shouldReceiveNewData}
          eventBusHandle={setEventBus}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
        />
      </div>
    </div>
  );
}

export default App;

//class-based component

// import "./App.css";

// import React, { Component } from "react";
// import Board from "react-trello";

// const data = require("http://localhost:3000");

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

// class App extends Component {
//   state = { boardData: { lanes: [] } };

//   setEventBus = (eventBus) => {
//     this.setState({ eventBus });
//   };

//   componentDidMount() {
//     fetch("http://localhost:3000/lanes")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         this.setState({ boardData: { lanes: data } });
//       });
//   }

//   async componentWillMount() {
//     const response = await this.getBoard();
//     this.setState({ boardData: response });
//   }

//   getBoard() {
//     return new Promise((resolve) => {
//       resolve(data);
//     });
//   }

//   completeCard = () => {
//     this.state.eventBus.publish({
//       type: "ADD_CARD",
//       laneId: "COMPLETED",
//       card: {
//         id: "Milk",
//         title: "Buy Milk",
//         label: "15 mins",
//         description: "Use Headspace app",
//       },
//     });
//     this.state.eventBus.publish({
//       type: "REMOVE_CARD",
//       laneId: "PLANNED",
//       cardId: "Milk",
//     });
//   };

//   addCard = () => {
//     this.state.eventBus.publish({
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

//   shouldReceiveNewData = (nextData) => {
//     console.log("New card has been added");
//     console.log(nextData);
//   };

//   handleCardAdd = (card, laneId) => {
//     console.log(`New card added to lane ${laneId}`);
//     console.dir(card);
//     this.postCard(card);
//   };

//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <h3>React Trello Demo</h3>
//         </div>
//         <div className="App-intro">
//           <button onClick={this.completeCard} style={{ margin: 5 }}>
//             Complete Buy Milk
//           </button>
//           <button onClick={this.addCard} style={{ margin: 5 }}>
//             Add Blocked
//           </button>
//           <Board
//             editable
//             onCardAdd={this.handleCardAdd}
//             data={this.state.boardData}
//             draggable
//             onDataChange={this.shouldReceiveNewData}
//             eventBusHandle={this.setEventBus}
//             handleDragStart={handleDragStart}
//             handleDragEnd={handleDragEnd}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
