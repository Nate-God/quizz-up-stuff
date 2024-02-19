import { useState, useEffect } from 'react';
import { getQuestionsByUser, editQuestion, deleteQuestion } from '../lib/apiWrapper';
import { QuestionType, UserType } from '../types';
import { useParams } from 'react-router-dom';
import EditQuestionForm from '../components/EditQuestions';

type EditQuestionsProps = { currentUser: UserType | null };

export default function EditQuestions({ currentUser }: EditQuestionsProps) {
    const [question, setQuestion] = useState<QuestionType | null>(null);
    const { questionId } = useParams<{ questionId: string }>();

    useEffect(() => {
        async function getData() {
            const token = localStorage.getItem('token') || '';
            const response = await getQuestionsByUser(token);
            console.log(response);
            if (response.data) {
                const foundQuestion = response.data.find((q: QuestionType) => q.id === Number(questionId));
                if (foundQuestion) {
                    setQuestion(foundQuestion);
                }
            }
        }

        getData();
    }, [questionId]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (question) {
            setQuestion({ ...question, [event.target.name]: event.target.value });
        }
    };

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (question) {
            const token = localStorage.getItem('token') || '';
            const response = await editQuestion(token, question.id, question);
            if (response.error) {
                console.log(response.error);
            } else {
                console.log(response.data);
            }
        }
    };

    const handleDeleteQuestion = async () => {
        if (question) {
            const token = localStorage.getItem('token') || '';
            const response = await deleteQuestion(token, question.id.toString());
            if (response.error) {
                console.log(response.error);
            } else {
                console.log(response.data);
            }
        }
    };

    return (
        <>
            {question ? (
                <EditQuestionForm
                    question={question}
                    onChange={handleInputChange}
                    onSubmit={handleFormSubmit}
                    onDelete={handleDeleteQuestion}
                />
            ) : (
                <h1>No questions available</h1>
            )}
        </>
    );
}