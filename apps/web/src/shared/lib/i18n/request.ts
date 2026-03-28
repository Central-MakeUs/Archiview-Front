import { getRequestConfig } from 'next-intl/server';
import type { AbstractIntlMessages } from 'use-intl';

import { routing } from './routing';

async function loadMessages(locale: string): Promise<AbstractIntlMessages> {
  const [
    commonMypage,
    commonCategoryPicker,
    archiverMypage,
    editorMypage,
    editorHome,
    editorProfile,
    editorRegisterPlace,
    archiverNavigation,
    editorNavigation,
  ] = await Promise.all([
    import(`./messages/${locale}/common/mypage.json`),
    import(`./messages/${locale}/common/categoryPicker.json`),
    import(`./messages/${locale}/archiver/mypage.json`),
    import(`./messages/${locale}/editor/mypage.json`),
    import(`./messages/${locale}/editor/home.json`),
    import(`./messages/${locale}/editor/profile.json`),
    import(`./messages/${locale}/editor/registerPlace.json`),
    import(`./messages/${locale}/archiver/navigation.json`),
    import(`./messages/${locale}/editor/navigation.json`),
  ]);

  return {
    mypage: {
      ...commonMypage.default.mypage,
      ...archiverMypage.default.mypage,
      ...editorMypage.default.mypage,
    },
    categoryPicker: commonCategoryPicker.default.categoryPicker,
    editorHome: editorHome.default.editorHome,
    editorProfile: editorProfile.default.editorProfile,
    editorRegisterPlace: editorRegisterPlace.default.editorRegisterPlace,
    archiverNav: archiverNavigation.default.archiverNav,
    editorNav: editorNavigation.default.editorNav,
  };
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    locale = routing.defaultLocale;
  }

  const messages = await loadMessages(locale);

  return {
    locale,
    messages,
  };
});
