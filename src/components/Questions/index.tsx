import React from 'react';
import { ReactNode } from 'react';

import './index.scss'

type Questionprops = {
    content: string;
    author: {
        avatar: string;
        name: string;
    },
    children?: ReactNode;
}

const Question = ({content, author, children} : Questionprops) => {

    return(
        <div className="question">
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name}/>
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>

            </footer>
        </div>
    )

}

export default Question;