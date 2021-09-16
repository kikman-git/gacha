import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import rakutenLogo from '../resources/Rakuten-logo.png';
import '../styles/Sharelink.css';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}))(MuiDialogContent);

export default function ShareLink() {
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const user_uuid = JSON.parse(window.sessionStorage.getItem('data'))[
    'user_uuid'
  ];
  console.log(user_uuid);
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Get extra gacha chance
      </Button>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => setOpen(false)}
        >
          <img src={rakutenLogo} width={100} />
        </DialogTitle>
        <DialogContent dividers>
          <p className="sharing-message">Share with your friends!</p>
          <p>http://localhost:3000/register/{user_uuid}</p>
          <CopyToClipboard
            text={`http://localhost:3000/register/${user_uuid}`}
            onCopy={() => setCopied(true)}
          >
            <Button variant="outlined">Copy</Button>
          </CopyToClipboard>
          {copied ? <span className="copied-message">Copied.</span> : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// export default ShareLink;
