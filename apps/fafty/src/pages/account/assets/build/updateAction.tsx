export default function updateAction(state: any, payload: any) {
  console.log('state:', state);
  console.log('payload:', payload);
  return {
    ...state,
    ...payload,
  };
}
