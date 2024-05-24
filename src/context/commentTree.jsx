import { createContext } from 'react';

export const CommentTreeContext = createContext();

export function CommentTreeProvider({ submitReply, children }) {
    return (
        <CommentTreeContext.Provider value={submitReply}>
            {children}
        </CommentTreeContext.Provider>
    );
}
