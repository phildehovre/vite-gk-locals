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



const schema = yup.object().shape({
    firstName: yup.string().required('A first name is required'),
    lastName: yup.string().required('A last name is required'),
    businessName: yup.string().required('A business name is required'),
    role: yup.string().required('A role is required'),
})

// 'id': uuidv4().toString().split('-').join('')

function CreateCustomer() {


    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })


    const navigate = useNavigate()


    // const addCustomer = useMutation({
    //     mutationFn: async (event: any) => {
    //         console.log('')
    //     });

    const onSubmit = (data: any) => {
        console.log(data)
        // const { name, description, span, permissions } = data
        // const event = {
        //     'name': name,
        //     'description': description,
        //     'span': span,
        //     'permissions': permissions,
        //     'template_id': uuidv4(),
        //     'author_id': session?.user.id
        // };
        // addTemplate.mutateAsync(event).then((res) => {
        //     if (res.data !== null) {
        //         context?.setSelectedTemplateId(res.data[0].template_id)
        //         navigate(`/dashboard/template/${res.data[0].template_id}`)
        //     }
        // }).catch(err => alert(err))
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='form-ctn'>
                <div className='form-input-ctn'>
                    <label>First name:
                        {errors?.firstName &&
                            <p className='form-error-msg'></p>
                        }
                    </label>
                    <input className='form-input'
                        {...register('firstName')}
                        name='firstName'
                        type='text'
                        autoComplete='off'
                        placeholder='first name'
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
                        type='text' placeholder='last name'
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
                        type='text' placeholder='Business name'
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
                    >
                    </input>
                </div>
                <button type='submit'>
                    {/* {addTemplate.isLoading ? <Spinner /> : 'Create template'} */}
                    Submit
                </button>
            </form>
        </div >
    )
}

export default CreateCustomer