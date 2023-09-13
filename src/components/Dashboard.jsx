const Dashboard = (props) => {
  const { loggedUser, setLoggedUser, setCurrentPage } = props;
  const clickHandler = () => {
    setLoggedUser("");
    setCurrentPage("login");
  };
  return (
    <>
      <p>Current Logged User is {loggedUser} </p>
      <button onClick={clickHandler}>Logout</button>
    </>
  );
};

export default Dashboard;
