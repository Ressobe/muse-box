'use client'

import { FormEvent, useState } from "react";

type AddCommentProps = {
    type: 'artist' | 'album' | 'song';
    id: number;
};

export default function AddComment({type, id} : AddCommentProps) {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const handleRatingClick = (rate: number) => {
        setRating(rate);
    }
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch('/api/comment/add', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },

            body: JSON.stringify( {
                type,
                id,
                rating,
                comment,
            })
        });

    }

    return (
        <form method="POST" className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex justify-between pt-2">
                {[1, 2, 3, 4, 5].map(i => {
                    return (
                        <button 
                            key={i} 
                            type="button"
                            onClick={() => handleRatingClick(i)}
                        >
                            <img className="w-8" src="/heart-regular.svg" />
                        </button>
                    );
                })}
            </div>
            <textarea 
                className="border"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
            >
            </textarea>
            <button className="border p-2 " type="submit">Dodaj komentarz</button>
        </form>
    );
}