import {
  XCircleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationIcon,
  XIcon,
} from '@heroicons/react/solid';

// Types
type AlertProps = {
  type: 'success' | 'error' | 'warning' | 'info';
  message: String;
  onClose?: () => void;
};

// Component
const Alert = ({ type, message, onClose }: AlertProps) => {
  // Render
  return (
    <div
      className={
        `p-4 rounded-md` +
        (type === 'success'
          ? ` bg-green-50`
          : type === 'error'
          ? ` bg-red-50`
          : type === 'warning'
          ? ` bg-yellow-50`
          : ` bg-blue-50`)
      }
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {type === 'success' ? (
            <CheckCircleIcon className="w-5 h-5 text-green-400" aria-hidden="true" />
          ) : type === 'error' ? (
            <XCircleIcon className="w-5 h-5 text-red-400" aria-hidden="true" />
          ) : type === 'warning' ? (
            <ExclamationIcon className="w-5 h-5 text-yellow-400" aria-hidden="true" />
          ) : (
            <InformationCircleIcon className="w-5 h-5 text-blue-400" aria-hidden="true" />
          )}
        </div>
        <div className="ml-3">
          <p
            className={
              `text-sm font-medium` +
              (type === 'success'
                ? ` text-green-700`
                : type === 'error'
                ? ` text-red-700`
                : type === 'warning'
                ? ` text-yellow-700`
                : ` text-blue-700`)
            }
          >
            {message}
          </p>
        </div>

        {onClose && (
          <div className="pl-3 ml-auto">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className={
                  `inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2` +
                  (type === 'success'
                    ? ` bg-green-50 text-green-500 hover:bg-green-100 focus:ring-offset-green-50 focus:ring-green-600`
                    : type === 'error'
                    ? ` bg-red-50 text-red-500 hover:bg-red-100 focus:ring-offset-red-50 focus:ring-red-600`
                    : type === 'warning'
                    ? ` bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-offset-yellow-50 focus:ring-yellow-600`
                    : ` bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-offset-blue-50 focus:ring-blue-600`)
                }
                onClick={onClose}
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;