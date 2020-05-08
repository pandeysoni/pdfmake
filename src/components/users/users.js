import React, {useState, useEffect} from 'react';

const Users = props => {
  const {items} = props;
  const [users, setUsers] = useState([]);

  useEffect(() => {
   setUsers(["Ram", "Shyam", "Hari"])
  },[]);

  const userMap = () => {
    return(users.map((user)=>(
      <p>{user}</p>
    )))
  }

  const itemsMap = () => {
    return(items.map((item)=>(
    <p>{item}</p>
    )))
  }

  return (
    <div><h5>Users Page</h5>
    {userMap()}
    {itemsMap()}
    </div>
  );
}

export default Users;

