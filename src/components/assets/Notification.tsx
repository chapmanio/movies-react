import {
  XCircleIcon,
  ExclamationIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  XIcon,
} from '@heroicons/react/solid';

// Types
export type NotificationProps = {
  visible: boolean;
  type: 'success' | 'warn' | 'error' | 'info';
  title: string;
  description?: string;
  onClose: () => void;
};

// Component
const Notification = ({
  visible,
  type = 'info',
  title,
  description,
  onClose,
}: NotificationProps) => (
  <div
    aria-live="assertive"
    className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end"
  >
    <div
      className={
        `w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 transition` +
        (visible
          ? ` pointer-events-auto ease-out duration-300 opacity-100 translate-y-0 sm:translate-x-0`
          : ` pointer-events-none ease-in duration-100 opacity-0 translate-y-2 sm:translate-y-0 sm:translate-x-2`)
      }
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {type === 'success' ? (
              <CheckCircleIcon className="w-6 h-6 text-green-400" />
            ) : type === 'warn' ? (
              <ExclamationIcon className="w-6 h-6 text-yellow-400" />
            ) : type === 'error' ? (
              <XCircleIcon className="w-6 h-6 text-red-400" />
            ) : type === 'info' ? (
              <InformationCircleIcon className="w-6 h-6 text-blue-400" />
            ) : null}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            {description && <p className="mt-1 text-sm text-gray-500">{description}.</p>}
          </div>
          <div className="flex flex-shrink-0 ml-4">
            <button
              className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={() => onClose()}
            >
              <span className="sr-only">Close</span>
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Notification;
