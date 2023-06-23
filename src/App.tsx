import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
// 1. api data show in table
//3.sortby name
//2.data interface should be typed

interface User {
  id: number;
  name: string,
  email: string,
  address: {
    city: string,
  },
  company: {
    name: string,
  }
}

const App: React.FC = () => {
  const [users, SetUsers] = useState<User[]>([]);
  const [newUser, SetNewUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    address: {
      city: '',
    },
    company: {
      name: '',
    }
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        //The data should be ordered by name.
        const sortedData = sortByName(response.data)
        SetUsers(sortedData)

      } catch (e) {
        console.log('error ', e)

      }

    }
    fetchUsers();

  }, [])
  //The data should be ordered by name.
  const sortByName = (userData: User[]): User[] => {
    return userData.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)

  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'address.name') {
      SetNewUser((prevUser) => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          city: value,
        }

      }))
    }

    else {
      SetNewUser((prevUser) => ({
        ...prevUser,
        [name]: value,

      }))
    }

  }

  const handleSubmit = (event: React.FormEvent) => {
    event?.preventDefault();
    //console.log("useradd",newUser)
    SetUsers((prev) => [...prev, newUser])


  }
  return (
    <div className="App">
      <h2>Welcome to React Typescript Boilerplate</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name='name' value={newUser.name} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="text" name='email' value={newUser.email} onChange={handleInputChange} />
        </label>
        <label>
          City:
          <input type="text" name='address.name' value={newUser.address.city} onChange={handleInputChange} />
        </label>
        <button type='submit'>Add User</button>
      </form>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Comapny</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
              <td>{user.company.name}</td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  );
}



export default App;
