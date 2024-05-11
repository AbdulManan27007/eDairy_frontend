import React, { useContext } from "react";
import "./Home.scss";
import Main from "./Main/Main";
import Sidebar from "./Sidebar/Sidebar";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import eDairyContext from "../../context/eDairyContext";
/* eslint-disable */

const Home = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  const context = useContext(eDairyContext);

  // const { pathname } = location;
  // const segments = pathname.split("/");
  // const data = location?.state?.id;

  const {
    user,
    dialogs,
    connectToChat,
    getChats,
    chosenDialog,
    setDialog,
    getMessages,
    messages,
    sendMessage,
    startGroupChat,
    startChat,
    usersInGroups,
    searchUsers,
    sendTypingStatus,
    typeStatus,
    sendMsgWithPhoto,
    lastActivity,
    removeUser,
    connectStatus,
  } = context;

  // useEffect(() => {
  //   if (!chosenDialog && data) {
  //     navigate(`/dashboard/${user.role}/chat`, { state: { id: data } });
  //   }
  // }, []);
  return (
    <div className="home__container">
      <Sidebar
        className="sidebar__block"
        user={user}
        dialogs={dialogs}
        connect={connectToChat}
        getChats={getChats}
        setDialog={setDialog}
        chosenDialog={chosenDialog}
        startGroupChat={startGroupChat}
        startChat={startChat}
        searchUsers={searchUsers}
        typeStatus={typeStatus}
        lastActivity={lastActivity}
        connectStatus={connectStatus}
      />
      <Main
        className="main__block"
        user={user}
        getMessages={getMessages}
        messages={messages}
        searchUsers={searchUsers}
        dialogs={dialogs}
        sendMessage={sendMessage}
        removeUser={removeUser}
        sendMsgWithPhoto={sendMsgWithPhoto}
        chosenDialog={chosenDialog}
        usersInGroups={usersInGroups}
        setDialog={setDialog}
        sendTypingStatus={sendTypingStatus}
        typeStatus={typeStatus}
        lastActivity={lastActivity}
      />
    </div>
  );
};

export default Home;
