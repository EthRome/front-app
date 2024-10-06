import { showToast } from './showToast';

export const copyToClipboard = async (copyText: string) => {
  try {
    await navigator.clipboard.writeText(copyText || '');
    showToast('Copied to clipboard', 'success');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while copying', err);
    showToast('Error while copying', 'error');
  }
};
