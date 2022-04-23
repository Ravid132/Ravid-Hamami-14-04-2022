function on(eventName, listener) {
  const callListener = ({ detail }) => {
    listener(detail);
  };

  window.addEventListener(eventName, callListener);

  return () => {
    window.removeEventListener(eventName, callListener);
  };
}

function emit(eventName, data) {
  window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}

export function showUserMsg(txt, type = '') {
  eventBusService.emit('show-user-msg', { txt, type });
}
export function showSuccessMsg(txt) {
  showUserMsg(txt, 'success');
}
export function showErrorMsg(txt) {
  console.log('test error messg');
  showUserMsg(txt, 'danger');
}
export const eventBusService = { on, emit };

window.myBus = eventBusService;
