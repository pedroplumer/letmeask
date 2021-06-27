import React from 'react';
import { ReactNode } from 'react';
import cx from 'classnames'

import './index.scss'

type Questionprops = {
    content: string;
    author: {
        avatar: string;
        name: string;
    },
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
}

const Question = ({content, author, children, isAnswered = false, isHighlighted = false} : Questionprops) => {

    return(
        <div className={cx('question', {answered : isAnswered}, {highLighted: isHighlighted && !isAnswered})}>
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