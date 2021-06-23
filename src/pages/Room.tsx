import Button from '../components/Button';
import React from 'react';
import logoImg from '../assets/images/logo.svg'

import '../styles/room.scss'

const Room = () => {
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask"/>
                    <div>codigo</div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala react</h1>
                    <span>4 perguntas</span>
                </div>

                <form>
                    <textarea
                        placeholder="O que você gostaria de perguntar?"
                    />
                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button>faça seu login</button></span>
                        <Button type="submit">Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}


export default Room;