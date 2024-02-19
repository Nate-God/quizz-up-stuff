import {useState, useEffect} from 'react'
import {getAllQuestions} from '../lib/apiWrapper'
import Question from '../components/Questions'



type Props = {}

export default function Quiz({ }: Props) {
    const [questions, setQuestions] = useState([])

    useEffect( () => {
        async function fetchData(){
            const response = await getAllQuestions();
            console.log(response);
            if (response.data){
                const questions = response.data;
                setQuestions(questions)
            }
        }

        fetchData();
    }, [] )

    return (
        <div>{questions.map(q => <Question key={q.id} question = {q} />)}</div>
    )
}