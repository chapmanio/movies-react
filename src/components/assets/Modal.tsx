// Types
type ModalProps = {
  visible: boolean;
};

// Component
const Modal: React.FC<ModalProps> = ({ visible, children }) => {
  // Render
  return (
    <div
      className={
        `fixed inset-0 z-10 overflow-y-auto` +
        (visible ? ` pointer-events-auto` : ` pointer-events-none`)
      }
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className={
            `fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity` +
            (visible ? ` opacity-100 duration-300 ease-out` : ` opacity-0 duration-200 ease-in`)
          }
          aria-hidden="true"
        />

        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div
          className={
            `inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle` +
            (visible
              ? ` translate-y-0 opacity-100 duration-300 ease-out sm:scale-100`
              : ` translate-y-4 opacity-0 duration-200 ease-in sm:translate-y-0 sm:scale-95`)
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
