import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { listUsers, deleteUser } from '../redux/actions/user.actions'

import { Loader } from '../components/Loader'

import { withLayout } from "../HOCs/withLayout";

export const UserListScreen = withLayout(() => {
    const dispatch = useDispatch();
    const { users, loading } = useSelector(state => state.userList);
    const { deleting } = useSelector(state => state.userDelete);

    useEffect(() => {
        dispatch(listUsers());
    }, [dispatch]);


    const handleUserDelete = (user) => {
        confirmAlert({
            title: 'Confirm to Delete User',
            message: 'Are you sure to delete this user ?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => dispatch(deleteUser(user._id))
              },
              {
                label: 'No'
              }
            ]
        });
    }

    return (
        <>
          <h1 style={{ marginTop: '1rem' }}>Users</h1>
            { deleting && <Loader /> }
            <Table striped bordered hover responsive className='table-sm' style={{ marginTop: '1.5rem' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? <i className='fas fa-check' style={{ color: 'green'}}></i> : <i className='fas fa-times' style={{ color: 'red'}}></i>}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => handleUserDelete(user)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>   
                        ))
                    }
                </tbody>
            </Table>
            {loading && <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <Loader />    
            </div>}
        </>
    )
});
