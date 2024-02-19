import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { QuestionFormDataType } from '../types';


type QuestionFormProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    question: QuestionFormDataType,
    onSubmit: (e: React.FormEvent) => void,
}

export default function QuestionForm({ onChange, question, onSubmit }: QuestionFormProps) {
    return (
        <Card className='my-3'>
            <Card.Body>
                <h3 className='text-center'> Question Form</h3>
                <Form onSubmit={onSubmit}>
                    <Form.Label>Enter Question</Form.Label>
                    <Form.Control name='question' value={question.question} onChange={onChange} />
                    <Form.Label>Enter Answer</Form.Label>
                    <Form.Control name='answer' value={question.answer} onChange={onChange} />
                    <Button className='mt-3 w-100' variant='primary' type='submit'>Create Question</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}