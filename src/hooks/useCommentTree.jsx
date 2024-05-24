import { useContext } from 'react';
import { CommentTreeContext } from '../context/commentTree';

export function useCommentTree() {
    const context = useContext(CommentTreeContext);

    if (!context) {
        throw new Error("Can't use context outside of scope");
    }

    return context;
}
