import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import cn from 'classnames';
import makeStyles from '@mui/styles/makeStyles';
import { AnimatePresence, motion } from 'framer-motion';

import { FormattedMessage, useIntl } from 'react-intl';
import { TextField, Typography } from '@welovedevs/ui';
import { CheckboxGroup } from '../../../../../commons/checkbox_group/checkbox_group';
import { CheckboxField } from '../../../../../commons/checkbox_field/checkbox_group';
import { JobIssuesEnum } from '../../../../../../types/enums/job_issues/job_issues_utils';
import { EditDialogField } from '../../../../../commons/edit_dialog_field/edit_dialog_field';

import { CURRENT_JOB_ISSUES_FIELD_OTHER_TEXTFIELD_TRANSITIONS_PROPS } from './current_job_issues_field_props';

import { translations } from '../../../../../../utils/enums_translations/job_issues_translations';
import { styles } from './current_job_issues_field_styles';

const useStyles = makeStyles(styles);
const checkboxGroupCurrentJobIssues = Object.values(JobIssuesEnum).filter((key) => key !== JobIssuesEnum.OTHER);

const CurrentJobIssuesFieldComponent = ({ error, currentJobIssues, onChange, setFieldValue }) => {
    const timerRef = useRef();
    const classes = useStyles();
    const { formatMessage } = useIntl();
    const otherCurrentJobIssue = useMemo(() => currentJobIssues[JobIssuesEnum.OTHER] ?? null, [currentJobIssues]);
    const [otherCurrentJobIssueValue, setOtherCurrentJobIssueValue] = useState(otherCurrentJobIssue);

    const checkedCurrentJobIssues = useMemo(
        () =>
            Object.entries(currentJobIssues || {})
                .filter(([, value]) => value === true)
                .map(([issue]) => issue),
        [currentJobIssues]
    );

    const handleCheckboxGroupChange = useCallback(
        (newCurrentJobIssues) =>
            onChange({
                ...newCurrentJobIssues.reduce((acc, issue) => {
                    acc[issue] = true;
                    return acc;
                }, {}),
                [JobIssuesEnum.OTHER]: currentJobIssues[JobIssuesEnum.OTHER]
            }),
        [currentJobIssues]
    );

    const toggleOtherCurrentJobIssue = useCallback(
        () =>
            setFieldValue(
                `currentJobIssues.${JobIssuesEnum.OTHER}`,
                typeof currentJobIssues[JobIssuesEnum.OTHER] === 'string' ? null : ''
            ),
        [currentJobIssues]
    );
    useEffect(() => setOtherCurrentJobIssueValue(otherCurrentJobIssue), [otherCurrentJobIssue]);

    const handleOtherJobIssueChange = useCallback((e) => setOtherCurrentJobIssueValue(e.target.value), []);

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        if (typeof otherCurrentJobIssueValue !== 'string' || !otherCurrentJobIssueValue.length) {
            return;
        }

        timerRef.current = setTimeout(() => {
            setFieldValue(`currentJobIssues.${JobIssuesEnum.OTHER}`, otherCurrentJobIssueValue);
        }, 500);
    }, [otherCurrentJobIssueValue]);

    return (
        <EditDialogField
            error={error}
            title={
                <FormattedMessage
                    id="DreamJob.editDialog.currentJobIssues.title"
                    defaultMessage="Which issues do you encounter in your current job?"
                />
            }
        >
            <CheckboxGroup
                rows={2}
                values={checkboxGroupCurrentJobIssues}
                translations={translations}
                value={checkedCurrentJobIssues}
                name="currentJobIssues"
                variant="outlined"
                onChange={handleCheckboxGroupChange}
            />
            <div className={classes.othersCheckbox}>
                <CheckboxField
                    title={<Typography>{formatMessage(translations.other)}</Typography>}
                    onClick={toggleOtherCurrentJobIssue}
                    checked={otherCurrentJobIssue !== null}
                    variant="outlined"
                    color="secondary"
                />
            </div>
            <AnimatePresence>
                {otherCurrentJobIssue !== null && (
                    <TextField
                        fullWidth
                        containerElement={motion.div}
                        classes={{ container: cn(classes.textField, classes.otherTextField) }}
                        onChange={handleOtherJobIssueChange}
                        name={`currentJobIssues[${JobIssuesEnum.OTHER}]`}
                        value={otherCurrentJobIssueValue}
                        variant="flat"
                        containerProps={{
                            variants: { CURRENT_JOB_ISSUES_FIELD_OTHER_TEXTFIELD_TRANSITIONS_PROPS },
                            initial: 'initial',
                            animate: 'enter',
                            exit: 'exit'
                        }}
                    />
                )}
            </AnimatePresence>
        </EditDialogField>
    );
};

export const CurrentJobIssuesField = CurrentJobIssuesFieldComponent;
