'use client';
import React from 'react';

type SubmitButtonProps = {
  isSubmitting: boolean;
};

export default function SubmitButton({ isSubmitting }: SubmitButtonProps) {
  return (
    <button
      disabled={isSubmitting}
      className='bg-blue-500 py-2 px-4 rounded-md w-full hover:bg-blue-700 disabled:bg-blue-300'
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  );
}
