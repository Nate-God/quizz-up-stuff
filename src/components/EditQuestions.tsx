import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { QuestionType } from '../types';


type EditQuestionFormProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    question: Partial<QuestionType>,
    onSubmit: (e: React.FormEvent) => void,
    onDelete: () => void;
}

export default function EditQuestions({ onChange, question, onSubmit, onDelete }: EditQuestionFormProps) {
    return (
        <Card className='my-3'>
            <Card.Body>
                <h3 className='text-center'>make your edit!</h3>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formQuestion">
                        <Form.Label>Enter Question</Form.Label>
                        <Form.Control name='question' value={question.question} onChange={onChange} />
                    </Form.Group>
                    <Form.Group controlId="formAnswer">
                        <Form.Label>Enter Answer</Form.Label>
                        <Form.Control name='answer' value={question.answer} onChange={onChange} />
                    </Form.Group>
                    <Button className='mt-3 w-100' variant='primary' type='submit'>Confirm Changes</Button>
                    <Button className='mt-3 w-100' variant='danger' onClick={onDelete}>Delete</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}