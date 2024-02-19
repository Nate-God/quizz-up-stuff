import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { UserFormDataType } from '../types';
import { createNewUser } from '../lib/apiWrapper';


export default function SignUp() {

    const [userFormData, setUserFormData] = useState<UserFormDataType>({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPass: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value});
    };

    const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        const response = await createNewUser(userFormData);
        if (response.error) {
            alert(response.error);
        } else {
            alert(`Congrats you have signed up with the email: ${userFormData?.email}`);
            window.location.href = '/login';
        }
    };

    const disableSubmit = userFormData.password.length < 6 || userFormData.password !== userFormData.confirmPass;

    return (
        <>
            <h1 className='text-center'>Register</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control name='first_name' placeholder='Enter First Name' value={userFormData.first_name} onChange={handleInputChange}/>

                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name='last_name' placeholder='Enter Last Name' value={userFormData.last_name} onChange={handleInputChange}/>

                        <Form.Label>Email</Form.Label>
                        <Form.Control name='email' type='email' placeholder='Enter Email Address' value={userFormData.email} onChange={handleInputChange}/>

                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password' type='password' placeholder='Enter Password' value={userFormData.password} onChange={handleInputChange}/>

                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control name='confirmPass' type='password' placeholder='Re-Enter Password' value={userFormData.confirmPass} onChange={handleInputChange}/>
                        {disableSubmit && <Form.Text className='text-danger'>Your password must be grater than 6 characters and match</Form.Text>}

                        <Button type='submit' variant='outline-primary' className='w-100 mt-3' disabled={disableSubmit}>Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}
