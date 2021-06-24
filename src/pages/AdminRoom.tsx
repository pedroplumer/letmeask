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
import useRoom from '../hooks/useRoom';



type roomParams = {
    id: string
}

const AdminRoom = () => {

    const [newQuestion, setNewQuestion] = useState('');
    const { user } = useAuth();

    const params = useParams<roomParams>();
    const roomId = params.id;

    const { questions, title } = useRoom(roomId);


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
                    <div>
                        <RoomCode code={params.id}/>
                        <Button isOutlined >Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

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


export default AdminRoom;