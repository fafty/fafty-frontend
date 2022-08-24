import React from 'react';
import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { useRouter } from 'next/router';
import updateAction from './updateAction';

const DetailsStep = (props) => {
  const { register, handleSubmit } = useForm();
  const { actions, state } = useStateMachine({ updateAction });
  const router = useRouter();

  const onSubmit = (data) => {
    actions.updateAction(data);
    router.push('./result');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 2</h2>
      <label>
        Age:
        <input {...register('age')} defaultValue={state.age} />
      </label>
      <label>
        Years of experience:
        <input {...register('yearsOfExp')} defaultValue={state.yearsOfExp} />
      </label>
      <input type="submit" />
    </form>
  );
};

export default DetailsStep;
