import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",  // Initialize password as an empty string
        geolocation: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log('Submitting form with:', credentials);
    
        try {
            const response = await fetch("http://localhost:5000/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation
                })
            });
    
            const json = await response.json();
            console.log('JSON response:', json);
    
            if (!json.success) {
                alert("Enter Valid Credentials");
            } else {
                alert("Signup successful !");
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            alert("An error occurred while submitting the form.");
        }
    }
    

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                    <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-success">Submit</button>
                <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
            </form>
        </div>
    )
}

export default Signup;
