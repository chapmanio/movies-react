import { createPortal } from 'react-dom';
import { XIcon } from '@heroicons/react/outline';

// Types
type BaseModalProps = {
  title: string;
  visible: boolean;
};

interface CloseableModal extends BaseModalProps {
  canClose: true;
  onClose: () => void;
}

interface UncloseableModal extends BaseModalProps {
  canClose: false;
}

type ModalProps = CloseableModal | UncloseableModal;

// Component
const Modal: React.FC<ModalProps> = (props) => {
  // Render
  return createPortal(
    <div
      className={
        `fixed inset-0 z-10 overflow-y-auto` +
        (props.visible ? ` pointer-events-auto` : ` pointer-events-none`)
      }
      aria-labelledby={props.title}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className={
            `fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity` +
            (props.visible
              ? ` opacity-100 duration-300 ease-out`
              : ` opacity-0 duration-200 ease-in`)
          }
          aria-hidden={!props.visible}
        />

        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div
          className={
            `inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle` +
            (props.visible
              ? ` translate-y-0 opacity-100 duration-300 ease-out sm:scale-100`
              : ` translate-y-4 opacity-0 duration-200 ease-in sm:translate-y-0 sm:scale-95`)
          }
        >
          {props.canClose ? (
            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={props.onClose}
              >
                <span className="sr-only">Close</span>
                <XIcon className="h-6 w-6" />
              </button>
            </div>
          ) : null}

          {props.children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
