import { toast } from 'react-toastify';
import Toast from '../components/utils/ToastContent.jsx';

/**
 * Displays a toast message with the provided body.
 *
 * @param {object} body - The body of the toast message.
 * @param {string} body.type - The type of the toast. Must be one of: 'success', 'info', 'warning', 'error'.
 * @param {string} body.title - The title of the toast.
 * @param {string} body.message - The message content of the toast.
 * @param {number} [body.duration] - Optional duration of the toast display (in milliseconds).
 */

export const showToast = (body) => {
  const { title, message, type, duration } = body;

  toast(
    Toast({
      title,
      message,
    }),
    {
      theme: 'colored',
      type,
      autoClose: duration || 3500,
    }
  );
};
