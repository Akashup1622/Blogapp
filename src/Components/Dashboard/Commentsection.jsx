import React from 'react'
import { useForm } from 'react-hook-form';

const Commentsection = () => {
    const {register,handleSubmit}=useForm();

  return (
    <>
    <div>
       <div>
          <form action="" onSubmit={handleSubmit()}>
            <textarea name='' id='' {...register("comment")}></textarea>
            <button type='submit'>Add Comment</button>

          </form>
       </div>
    </div>
    </>
  )
}

export default Commentsection
