import React, {useState, useEffect} from 'react';
import {Redirect, Link} from 'react-router-dom';

const Users = ({user, token, setSingleUser}) => {
    const [usersList, setUsersList] = useState([]);

    const getUsers = async () => {
        const response = await fetch('/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setUsersList(data);
    }

    useEffect( () => {
        getUsers();
    }, []);

    if (user.isAdmin) {
        return (<>
            <h2>List of Users</h2>
            <button>Add A New User</button>
            <div className='users-list'>
                {usersList.map(_user => {
                    const {id, username, isAdmin} = _user;

                    return (<div className='single-user' key={id}>
                        <br />
                        <Link to={`/users/view/${id}`}><h3 onClick={() => setSingleUser(_user)}>{username}</h3></Link>
                        <div>User ID: {id}</div>
                        <div>isAdmin? {isAdmin ? 'Yes' : 'No'}</div>
                    </div>)
                })}
            </div>
        </>)
    } else {
        return <Redirect to='/' />
    }
}

const SingleUser = ({user, singleUser, setSingleUser}) => {
    const {id, username, isAdmin, firstName, lastName, email, address, city, state, zip} = singleUser;

    if (user.isAdmin) {
        return (<div className='single-user-detail'>
            <h3>{username}</h3>
            <div>User ID: {id}</div>
            <div>isAdmin? {isAdmin ? 'Yes' : 'No'}</div>
            <div>Name: {firstName} {lastName}</div>
            <div>Email: {email}</div>
            <div>Address: {address} {city}, {state} {zip}</div>
            <Link to={`/users/${id}`}><button>Edit User</button></Link>
        </div>)
    } else {
        return <Redirect to='/' />
    }

}

const EditUser = ({user, singleUser, setSingleUser, token}) => {
    const {id, username, isAdmin, firstName, lastName, email, address, city, state, zip} = singleUser;

    if (user.isAdmin) {
        return (<div>
            This is the edit user.
        </div>)
    } else {
        return <Redirect to='/' />
    }

}

export {Users, SingleUser, EditUser};