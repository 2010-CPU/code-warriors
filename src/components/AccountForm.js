import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Dropdown from 'react-dropdown';


const AccountForm = ({type, setToken, setUser}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    const history = useHistory();
    const title = type === 'login' ? 'LOGIN' : 'REGISTER';
    const oppositeTitle = type === 'login' ? 'Not yet registered? Sign up here!' : 'Already registered? Login here!'
    const oppositeType = type === 'login' ? 'register' : 'login';

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (type === 'register' && password !== confirmPassword) {
            setLoginMessage('Passwords do not match. Please try again.')
        } else {
            const response = await fetch(`/api/users/${type}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password,
                    firstName,
                    lastName,
                    email, 
                    address, 
                    city, 
                    state,
                    zip
                })
            })
            const data = await response.json();
            setLoginMessage(data.message);

            const token = data.token ? data.token : '';
            localStorage.setItem('token', token);
            if (token) {
                setToken(token);

                const response = await fetch(`/api/users/me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                const meData = await response.json();
                setUser(meData);
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                history.push('/');
            }
        }
        
    }
    const handleSelectState = (event) => {
        setState(event.value)
    }
    const states = [
        { 'label':'Alabama', 'value': 'AL' },
        { 'label':'Alaska', 'value': 'AK'},
        { 'label':'American Samoa', 'value': 'AS'},
        { 'label':'Arizona', 'value': 'AZ'},
        { 'label':'Arkansas', 'value': 'AR'},
        { 'label':'California', 'value': 'CA'},
        { 'label':'Colorado', 'value': 'CO'},
        { 'label':'Connecticut', 'value': 'CT'},
        { 'label':'Delaware', 'value': 'DE'},
        { 'label':'District of Columbia', 'value': 'DC'},
        { 'label':'States of Micronesia', 'value': 'FM'},
        { 'label':'Florida', 'value': 'FL'},
        { 'label':'Georgia', 'value': 'GA'},
        { 'label':'Guam', 'value': 'GU'},
        { 'label':'Hawaii', 'value': 'HI'},
        { 'label':'Idaho', 'value': 'ID'},
        { 'label':'Illinois', 'value': 'IL'},
        { 'label':'Indiana', 'value': 'IN'},
        { 'label':'Iowa', 'value': 'IA'},
        { 'label':'Kansas', 'value': 'KS'},
        { 'label':'Kentucky', 'value': 'KY'},
        { 'label':'Louisiana', 'value': 'LA'},
        { 'label':'Maine', 'value': 'ME'},
        { 'label':'Marshall Islands', 'value': 'MH'},
        { 'label':'Maryland', 'value': 'MD'},
        { 'label':'Massachusetts', 'value': 'MA'},
        { 'label':'Michigan', 'value': 'MI'},
        { 'label':'Minnesota', 'value': 'MN'},
        { 'label':'Mississippi', 'value': 'MS'},
        { 'label':'Missouri', 'value': 'MO'},
        { 'label':'Montana', 'value': 'MT'},
        { 'label':'Nebraska', 'value': 'NE'},
        { 'label':'Nevada', 'value': 'NV'},
        { 'label':'New Hampshire', 'value': 'NH'},
        { 'label':'New Jersey', 'value': 'NJ'},
        { 'label':'New Mexico', 'value': 'NM'},
        { 'label':'New York', 'value': 'NY'},
        { 'label':'North Carolina', 'value': 'NC'},
        { 'label':'North Dakota', 'value': 'ND'},
        { 'label':'Northern Mariana Islands', 'value': 'MP'},
        { 'label':'Ohio', 'value': 'OH'},
        { 'label':'Oklahoma', 'value': 'OK'},
        { 'label':'Oregan', 'value': 'OR'},
        { 'label':'Palau', 'value': 'PW'},
        { 'label':'Pennsylvania', 'value': 'PA'},
        { 'label':'Puerto Rico', 'value': 'PR'},
        { 'label':'Rhode Island', 'value': 'RI'},
        { 'label':'South Carolina', 'value': 'SC'},
        { 'label':'South Dakota', 'value': 'SD'},
        { 'label':'Tennessee', 'value': 'TN'},
        { 'label':'Texas', 'value': 'TX'},
        { 'label':'Utah', 'value': 'UT'},
        { 'label':'Vermont', 'value': 'VT'},
        { 'label':'Virgin Islands', 'value': 'VI'},
        { 'label':'Virginia', 'value': 'VA'},
        { 'label':'Washington', 'value': 'WA'},
        { 'label':'West Virginia', 'value': 'WV'},
        { 'label':'Wisconsin', 'value': 'WI'},
        { 'label':'Wyoming', 'value': 'WY'}
        ];

    const options = states.map((state) => { 
        return {
            value: state.value,
            label: state.label
        }
    })

    return (
        <div className='bg-image img1'> 
        <div className='account-form'>
        <div>{loginMessage}</div>
        <br />
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <div>Username</div>
                <input type='text' value={username} minLength='3' maxLength='20' required onChange={event => setUsername(event.target.value)}></input>
            </div>
            <div>
                <div>Password</div>
                <input type='password' value={password} minLength='7' maxLength='20' required onChange={event => setPassword(event.target.value)}></input>
            </div>
            <div>
                {type === 'register' ?
                    <>
                        <div>
                            <div>Confirm Password</div>
                            <input type='password' value={confirmPassword} minLength='7' maxLength='20' required onChange={event => setConfirmPassword(event.target.value)}></input>
                        </div>
                        <div>
                            <div>First Name</div>
                            <input type='text' value={firstName} required onChange={event => setFirstName(event.target.value)} ></input>
                        </div>
                        <div>
                            <div>Last Name</div>
                            <input type='text' value={lastName} required onChange={event => setLastName(event.target.value)} ></input>
                        </div>
                        <div>
                            <div>Email</div>
                            <input type='email' value={email} required onChange={event => setEmail(event.target.value)} ></input>
                        </div>
                        <div>
                            <div>Address</div>
                            <input type='text' value={address} required onChange={event => setAddress(event.target.value)} ></input>
                        </div>
                        <div>
                            <div>City</div>
                            <input type='text' value={city} required onChange={event => setCity(event.target.value)} ></input>
                        </div>
                        <div>
                            <div>State</div>
                            <Dropdown
                                className="state-drop"
                                options={options}
                                selected={options}
                                onChange={handleSelectState}
                                placeholder={"select your state"}/> 
                        </div>
                        <div>
                            <div>Zip Code</div>
                            <input type='number' value={zip} required minLength='5' maxLength='5' onChange={event => setZip(event.target.value)} ></input>
                        </div>
                    </>
                : ''}
            </div>
            <button type='submit'>{title}</button>
        </form>
        <div id='opposite-account-form'><Link to={`/${oppositeType}`}>{oppositeTitle}</Link></div>
    </div>
    </div>)
}

export default AccountForm;