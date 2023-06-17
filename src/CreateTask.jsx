import React from "react";

const CreateTask = () => {
  return (
    <div className="taskBoard">
      <form>
        <input type="text" className="taskBoard__tittle" />
        <input type="text" className="taskBoard__description" />
        <div className="taskBoard__timeFromTo timeFromTo">
          <input type="text" className="timeFromTo__from" />
          <input type="text" className="timeFromTo__to" />
        </div>
        <div className="taskBoard__buttenArea">
          <button className="buttenArea__submit"></button>
          <button className="buttenArea__cancel"></button>
          <button className="buttenArea__delete"></button>
        </div>
      </form>
    </div>
  );
};
