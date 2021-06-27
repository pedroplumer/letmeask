import Button from '../components/Button';
import React, { useEffect, useState } from 'react';
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg'

import Question from '../components/Questions/index';

import '../styles/room.scss'
import RoomCode from '../components/RoomCode';
import { useParams } from 'react-router';
import useAuth from '../hooks/useAuth';
import { userInfo } from 'os';
import { database } from '../services/firebase';
import { FormEvent } from 'react';
import useRoom from '../hooks/useRoom';
import { useHistory } from 'react-router-dom';



type roomParams = {
    id: string
}

const AdminRoom = () => {

    const history = useHistory();

    const params = useParams<roomParams>();
    const roomId = params.id;

    const { questions, title } = useRoom(roomId);

    const handleDeleteQuestion = async (questionId: string) => {
        if (window.confirm('Tem certeza que deseja excluir esta pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    const handleEndRoom = async () => {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })
        history.push('/')
    }

    const handleQuestionAnswered = async (questionId: string) => {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        })
    }

    const handleHighlightQuestion = async (question: any) => {
        await database.ref(`rooms/${roomId}/questions/${question.id}`).update({
            isHighLighted: !question.isHighlighted
        })
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask"/>
                    <div>
                        <RoomCode code={params.id}/>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
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
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button type="button" onClick={() => handleQuestionAnswered(question.id)}>
                                            <img src={checkImg} alt="Marcar pergunta como respondida"/>
                                        </button>
                                
                                        <button type="button" onClick={() => handleHighlightQuestion(question)}>
                                            <img src={answerImg} alt="Dar destaque à pergunta"/>
                                        </button>
                                    </>
                                )}

                                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={deleteImg} alt="Remover pergunta"/>
                                </button>
                            </Question>
                        );
                    })}
                </div>

                
            </main>
        </div>
    )
}


export default AdminRoom;