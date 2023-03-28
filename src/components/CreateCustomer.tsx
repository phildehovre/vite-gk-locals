import React from 'react'
import { useState, useContext } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Spinner from './Spinner'
import { useNavigate } from 'react-router'
import './CreateCustomer.scss'
import { setBusiness } from '../util/db'
import { getAuth } from 'firebase/auth'



const schema = yup.object().shape({
    firstName: yup.string().required('A first name is required'),
    lastName: yup.string().required('A last name is required'),
    email: yup.string().email().required('A last name is required'),
    businessName: yup.string().required('A business name is required'),
    role: yup.string().required('A role is required'),
})

// 'id': uuidv4().toString().split('-').join('')

function CreateCustomer() {


    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) })

    const auth = getAuth()
    const navigate = useNavigate()
    const queryClient = useQueryClient()


    const addBusiness = useMutation({
        mutationFn: (business: any) => setBusiness(business),
        onSuccess: () => {
            queryClient.invalidateQueries(['businesses'])
        },
    });



    const onSubmit = (data: any) => {
        const business = {
            ...data, 'businessId': uuidv4().toString().split('-').join(''),
            userID: auth?.currentUser?.uid
        }
        addBusiness.mutateAsync(business).then((res) => {
        }).catch(err => alert(err));
        reset()
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='form-ctn'>
                <div className='form-input-ctn'>
                    <label>First name:
                        {errors?.firstName &&
                            <p className='form-error-msg'>Please enter a first name</p>
                        }
                    </label>
                    <input className='form-input'
                        {...register('firstName')}
                        name='firstName'
                        type='text'
                        autoComplete='off'
                        placeholder='First name...'
                    ></input>
                </div>
                <div className='form-input-ctn'>
                    <label>Last Name:
                        {errors?.lastName &&
                            <p className='form-error-msg'>Please enter a name</p>
                        }
                    </label>
                    <input
                        {...register('lastName')}
                        name='lastName'
                        type='text' placeholder='Last name...'
                        autoComplete='off'
                        className='form-input'>
                    </input>
                </div>
                <div className='form-input-ctn'>
                    <label>E-mail address:
                        {errors?.email &&
                            <p className='form-error-msg'>Please enter a valid e-mail</p>
                        }
                    </label>
                    <input
                        {...register('email')}
                        name='email'
                        type='text' placeholder='E-mail address...'
                        autoComplete='off'
                        className='form-input'>
                    </input>
                </div>

                <div className='form-input-ctn'>
                    <label>Business name:
                        {errors?.businessName &&

                            <p className='form-error-msg'>Describe the new template</p>
                        }
                    </label>
                    <input
                        {...register('businessName')}
                        name='businessName'
                        autoComplete='off'
                        type='text' placeholder='Business name...'
                        className='form-input id'
                    ></input>
                </div>
                <div className='form-input-ctn'>
                    <label>Role:
                        {errors?.role &&
                            <p className='form-error-msg'>Must enter a role</p>
                        }
                    </label>
                    <input
                        {...register('role')}
                        name='role'
                        className='form-input'
                        type='text'
                        placeholder='Role...'
                    >
                    </input>
                </div>
                <button type='submit'>
                    {addBusiness.isLoading ? <Spinner /> : 'Add business'}
                </button>
            </form>
        </div >
    )
}

export default CreateCustomer