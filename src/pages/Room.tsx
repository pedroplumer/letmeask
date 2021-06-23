import Button from '../components/Button';
import React, { useState } from 'react';
import logoImg from '../assets/images/logo.svg'

import '../styles/room.scss'
import RoomCode from '../components/RoomCode';
import { useParams } from 'react-router';
import useAuth from '../hooks/useAuth';
import { userInfo } from 'os';
import { database } from '../services/firebase';
import { FormEvent } from 'react';

type roomParams = {
    id: string
}

const Room = () => {

    const [newQuestion, setNewQuestion] = useState('');
    const { user } = useAuth();

    const params = useParams<roomParams>();
    const roomId = params.id;

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
                    <h1>Sala react</h1>
                    <span>4 perguntas</span>
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="O que você gostaria de perguntar?"
                        onChange={(event) => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button>faça seu login</button></span>
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}


export default Room;