const Dashboard = (props) => {
  const { loggedUser } = props;

  return <>{console.log(loggedUser.username)}</>;
};

export default Dashboard;
