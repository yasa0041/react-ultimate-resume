import React, { useMemo } from 'react';

import makeStyles from '@mui/styles/makeStyles';
import { FormattedMessage, useIntl } from 'react-intl';

import { EditDialog } from '../../../../commons/edit_dialog/edit_dialog';
import { SkillsEditForm } from './skills_edit_form/skills_edit_form';

import { styles } from './skills_edit_dialog_styles';
import { useOptions } from '../../../../hooks/use_options';

const useStyles = makeStyles(styles);

const SkillsEditDialogComponent = ({ open, onClose, data, onEdit, validationSchema, isEditing }) => {
    const classes = useStyles();
    const { formatMessage } = useIntl();
    const maxSkills = useOptions('maxSkills', 12);
    const validationSchemaToPass = useMemo(() => validationSchema(formatMessage, { limitTo: maxSkills }), [
        validationSchema
    ]);

    if (!open) {
        return null;
    }
    return (
        <EditDialog
            fullScreen
            classes={{
                paper: classes.paper,
                content: classes.content
            }}
            open={open}
            isEditing={isEditing}
            onClose={onClose}
            data={data}
            onEdit={onEdit}
            validationSchema={validationSchemaToPass}
            dialogClasses={{ dialog: { root: classes.dialogRoot, paper: classes.dialogPaper } }}
            title={<FormattedMessage id="Skills.editDialog.title" defaultMessage="What are your main skills?" />}
            disableEnforceFocus
        >
            {(helpers) => <SkillsEditForm helpers={helpers} />}
        </EditDialog>
    );
};

export const SkillsEditDialog = SkillsEditDialogComponent;
