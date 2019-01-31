import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  default: ""
};

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  },
  success: { backgroundColor: green[600] },
  warning: { backgroundColor: amber[700] },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  default: { backgroundColor: "rgba(0, 0, 0, 0)" },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

const SnackbarContents = props => {
  const { classes, className, message, onClose, variant } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          {Icon === variantIcon.default ? (
            ""
          ) : (
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
          )}
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
    />
  );
};

const SnackbarContentsWrapper = withStyles(styles)(SnackbarContents);

const SnackbarFlashMessage = props => {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={props.flashMessage.open}
        autoHideDuration={6000}
        onClose={props.hideFlashMessage}
      >
        <SnackbarContentsWrapper
          onClose={props.hideFlashMessage}
          variant={props.flashMessage.type}
          message={props.flashMessage.message}
        />
      </Snackbar>
    </div>
  );
};

SnackbarFlashMessage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SnackbarFlashMessage);
