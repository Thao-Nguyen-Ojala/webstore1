import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
  },
  avatar: {
    margin: '0 auto',
    //marginTop: theme.spacing(4),
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },
  progress: {
    margin: theme.spacing(0, 0, 3, 0),
    position: 'relative',
    left: 0,
    right: 0,
  },
}));

export { useStyles };
