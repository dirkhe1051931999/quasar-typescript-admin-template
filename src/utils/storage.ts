const title = 'rtcpt';
// third-component-state
const thirdComponentStateKey = `${title}_third_component_state`;
export const getThirdComponentState = (): string | null => {
  return localStorage.getItem(thirdComponentStateKey);
};
export const setThirdComponentState = (data: any) => {
  localStorage.setItem(thirdComponentStateKey, data);
};
export const removeThirdComponentState = () => {
  localStorage.removeItem(thirdComponentStateKey);
};