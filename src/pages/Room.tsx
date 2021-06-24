import Button from '../components/Button';
import React, { useEffect, useState } from 'react';
import logoImg from '../assets/images/logo.svg'
import Question from '../components/Questions/index';

import '../styles/room.scss'
import RoomCode from '../components/RoomCode';
import { useParams } from 'react-router';
import useAuth from '../hooks/useAuth';
import { userInfo } from 'os';
import { database } from '../services/firebase';
import { FormEvent } from 'react';

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

type roomParams = {
    id: string
}

const Room = () => {

    const [newQuestion, setNewQuestion] = useState('');
    const { user } = useAuth();
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('')

    const params = useParams<roomParams>();
    const roomId = params.id;

    useEffect(()=> {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions = databaseRoom.questions as FirebaseQuestions;
            const parsedQuestions = Object.entries(firebaseQuestions ?? {}).map(([key,value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered
                }
            })
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })
    },[roomId])

    const handleSendQuestion = async (event: FormEvent) => {
        event.preventDefault();

        if(newQuestion.trim() === '') return
        if(!user) throw new Error('You must be logged in!')

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighLighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('')
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask"/>
                    <RoomCode code={params.id}/>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="O que você gostaria de perguntar?"
                        onChange={(event) => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        { user ? (  <div className="user-info">
                                        <img src={user.avatar} alt={user.name}/>
                                        <span>{user.name}</span>
                                    </div> ) 
                            : 
                        (<span>Para enviar uma pergunta, <button>faça seu login</button></span> )}
                        
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            />
                        );
                    })}
                </div>

                
            </main>
        </div>
    )
}


export default Room;