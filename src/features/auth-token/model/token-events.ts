type ModalListener = () => void;
const modalListeners = new Set<ModalListener>();

export function openTokenModal(): void {
  modalListeners.forEach((listener) => listener());
}

export function subscribeToOpenModal(listener: ModalListener): () => void {
  modalListeners.add(listener);
  return () => {
    modalListeners.delete(listener);
  };
}
