import axios from "axios"
import {QuestionType, QuestionFormDataType, UserType, UserFormDataType} from "../types"

type APIResponse<T> = {
    error? :string,
    data?:T
}

const baseURL: string = 'https://cae-bookstore.herokuapp.com/';
const userEndpoint: string = '/user';
const tokenEndpoint: string = '/login';
const questionEndpoint: string = '/question';


export const apiClientNoAuth = () => axios.create({  baseURL: baseURL  })

export const apiClientBasicAuth = (email:string, password:string) => axios.create(
    {
        baseURL: baseURL,
        headers: {  Authorization: 'Basic ' + btoa(`${email}:${password}`)  }
    }
)

export const apiClientTokenAuth = (token:string) => axios.create(
    {
        baseURL: baseURL,
        headers: {  Authorization: 'Bearer ' + token  }
    }
)


export async function getAllQuestions(): Promise<APIResponse<QuestionType[]>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().get(questionEndpoint + '/all');
        data = response.data.questions
    } catch(err) {
        if (axios.isAxiosError(err)){  error = err.message  } 
        else {  error = 'Something went wrong'  }
    }
    return {data, error}
}


export async function getQuestionsByUser(token:string): Promise<APIResponse<QuestionType[]>>{
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).get(questionEndpoint);
        data = response.data.questions
    } catch(err) {
        if (axios.isAxiosError(err)){  error = err.message  } 
        else {  error = 'Something went wrong'  }
    }
    return {data, error}
}


export async function createNewUser(newUserData:UserFormDataType): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().post(userEndpoint, newUserData);
        data = response.data
        console.log(response.data)
    } catch(err) {
        if (axios.isAxiosError(err)){  error = err.response?.data.error  } 
        else {  error = 'Something went wrong'  }
    }
    return {data, error}
}


export async function login(email:string, password:string): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientBasicAuth(email, password).get(tokenEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){  error = err.message  } 
        else {  error = 'Something went wrong'  }
    }
    return {data, error}
}


export async function getMe(token:string): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).get(userEndpoint + '/me')
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)){  error = err.response?.data.error  }
        else {  error = 'Something went wrong'  }
    }
    return {data, error}
}

export async function createQuestion(token:string, questionFormData: QuestionFormDataType): Promise<APIResponse<{id:number}>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).post(questionEndpoint, questionFormData);
        data = response.data;
    } catch(err) {
        if (axios.isAxiosError(err)){  error = err.response?.data.error  } 
        else {  error = 'Something went wrong'  }
    }
    return {data, error}
}

export async function getQuestion(questionId:string): Promise<APIResponse<QuestionType>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().get(questionEndpoint + '/' + questionId);
        data = response.data;
    } catch(err) {
        if (axios.isAxiosError(err)){  error = err.response?.data.error  } 
        else {  error = 'Something went wrong'  }
    }
    return {data, error}
}


export async function editQuestion(token:string, questionId:number, editedQuestionData:Partial<QuestionType>): Promise<APIResponse<string>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).put(questionEndpoint + '/' + questionId, editedQuestionData);
        data = response.statusText
    } catch(err) {
        if (axios.isAxiosError(err)){  error = err.response?.data.error  } 
        else {  error = 'Something went wrong'  }
    }
    return {data, error}
}

export async function deleteQuestion(token:string, questionId:string): Promise<APIResponse<{success:string}>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).delete(questionEndpoint + '/' + questionId);
        data = response.data;
    } catch(err) {
        if (axios.isAxiosError(err)){  error = err.response?.data.error
        } else {  error = 'Something went wrong'  }
    }
    return {data, error}
}


