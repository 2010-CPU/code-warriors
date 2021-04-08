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
                        <div className="single-user-detail"> 
                        <br />
                        <Link to={`/users/${id}`}><h3 onClick={() => setSingleUser(_user)}>{username}</h3></Link>
                        <div>User ID: {id}</div>
                        <div>isAdmin? {isAdmin ? 'Yes' : 'No'}</div>
                        </div>
                    </div>)
                })}
            </div>
        </>)
    } else {
        return <Redirect to='/' />
    }
}

const SingleUser = ({token, user, singleUser, setSingleUser}) => {
    const {id, username, isAdmin, firstName, lastName, email, address, city, state, zip} = singleUser;
    
    const [showEditUser, setShowEditUser] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`/api/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify({
                username,
                isAdmin,
                firstName,
                lastName,
                email, 
                address, 
                city, 
                state,
                zip
            })
        })
        const data = response.json();
    }

    if (user.isAdmin) {
        return (<div className='single-user-detail'>
            {!showEditUser ? 
                <>
                <h3>{username}</h3>
                <div>User ID: {id}</div>
                <div>isAdmin? {isAdmin ? 'Yes' : 'No'}</div>
                <div>Name: {firstName} {lastName}</div>
                <div>Email: {email}</div>
                <div>Address: {address} {city}, {state} {zip}</div>
                <button onClick={() => setShowEditUser(!showEditUser)}>Edit User</button>
                </>
                :
                <>
                <div>Come back soon to edit a user!</div>
                </>
            }
        </div>)
    } else {
        return <Redirect to='/' />
    }

}

export {Users, SingleUser};