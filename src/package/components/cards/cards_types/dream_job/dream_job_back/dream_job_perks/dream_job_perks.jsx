import React from 'react';

import makeStyles from '@mui/styles/makeStyles';
import { useIntl } from 'react-intl';

import { JobPerks as JobPerksEnum } from '../../../../../../types/enums/job_perks/job_perks_utils';
import { jobPerksTranslations } from '../../../../../../utils/enums_translations/job_perks_translations';
import { styles } from './dream_job_perks_styles';

const useStyles = makeStyles(styles);

const DreamJobPerksComponent = ({ perks = {} }) => {
    const classes = useStyles();
    const { formatMessage } = useIntl();
    return (
        <ul className={classes.list}>
            {Object.entries(perks)
                .filter(([, value]) => Boolean(value))
                .map(([perkId, value]) => {
                    if (perkId === JobPerksEnum.OTHER) {
                        return (
                            <li className={classes.listItem} key={`dream_job_perk_${perkId}`}>
                                {value}
                            </li>
                        );
                    }
                    return (
                        <li className={classes.listItem} key={`dream_job_perk_${perkId}`}>
                            {formatMessage(jobPerksTranslations[perkId.toLowerCase()] || jobPerksTranslations.others)}
                        </li>
                    );
                })}
        </ul>
    );
};

export const DreamJobPerks = DreamJobPerksComponent;
