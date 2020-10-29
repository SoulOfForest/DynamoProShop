import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { history } from '../helpers/history'

export const SearchBox = () => {
    const { register, handleSubmit } = useForm();

    const handleFormSubmit = (data) => {
        const query = data.q;
        if (query) {
            history.push(`/search?q=${query}`)
        } else {
            history.push('/');
        }
    }

    return (
        <Form onSubmit={handleSubmit(handleFormSubmit)} inline>
            <Form.Control type='text' name='q' ref={register()} placeholder='Search Products ...' className='mr-sm-2 ml-sm-5'>
            </Form.Control>
            <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
        </Form>
    )
}
