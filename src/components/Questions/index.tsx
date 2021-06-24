import React from 'react';

import './index.scss'

type Questionprops = {
    content: string;
    author: {
        avatar: string;
        name: string;
    }
}

const Question = ({content, author} : Questionprops) => {

    return(
        <div className="question">
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name}/>
                    <span>{author.name}</span>
                </div>

            </footer>
        </div>
    )

}

export default Question;