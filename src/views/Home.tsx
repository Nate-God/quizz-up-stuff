import { useState } from 'react';
import { QuestionFormDataType, UserType } from '../types';
import QuestionForm from '../components/QuestionForm'
import { createQuestion } from '../lib/apiWrapper';


type HomeProps = {
    isAuthenticated:boolean,
    currentUser: UserType|null,
}

export default function Home({ isAuthenticated, currentUser }: HomeProps) {

    const [newQuestion, setNewQuestion] = useState<QuestionFormDataType>({question: '', answer: ''})

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewQuestion({...newQuestion, [event.target.name]: event.target.value})
    }

    const handleFormSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await createQuestion(token, newQuestion)
        if (response.error){
            console.log(response.error)
        }else{
            console.log(response.data)
        }
    }

    return (
        <>
            <h1>{ isAuthenticated ? 'Welcome back ' + currentUser.first_name : 'Welcome the the amazing quizz app!' }</h1>
            {isAuthenticated ? <QuestionForm onChange={handleInputChange} question={newQuestion} onSubmit={handleFormSubmit} />
            :'Please Signup to use AWSOME features'}
        </>
    )
}