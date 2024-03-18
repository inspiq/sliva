import { usePathname } from 'next/navigation';

export const usePrivacyPolicyPath = () => {
  const currentLanguageFromPath = usePathname().slice(1, 3);

  if (currentLanguageFromPath === 'ru') {
    return '/files/privacy-policy-ru.docx';
  } else {
    return '/files/privacy-policy-en.docx';
  }
};
