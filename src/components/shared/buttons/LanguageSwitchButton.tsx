import React from 'react';
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";

function LanguageSwitchButton() {
    const router = useRouter();
    const { t } = useTranslation('common');

    const changeLanguage = (lng : string) => {
        const { pathname, asPath, query } = router
        router.push({pathname, query}, asPath, {locale: lng}).then(r => {})
     };

    const changeTo = router.locale;

    return (
        <div>
            <button onClick={() => changeLanguage('ko')}>ko</button>
            <button onClick={() => changeLanguage('en')}>en</button>
            <h3>Current Language: </h3>
        </div>
    );
}

export default LanguageSwitchButton;