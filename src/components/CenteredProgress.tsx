import { CircularProgress, createStyles, makeStyles, Theme } from '@material-ui/core';

type Props = {
  spinnerSize?: number;
};

const useStyles = makeStyles<Theme, Props>(() =>
  createStyles({
    container: {
      position: 'relative',
      minHeight: '100vh',
    },
    progress: {
      position: 'absolute',
      margin: '0',
      top: '40%',
      left: ({ spinnerSize }) => `calc(50% - ${spinnerSize}rem / 2)`,
      width: ({ spinnerSize }) => `${spinnerSize}rem !important`,
      height: ({ spinnerSize }) => `${spinnerSize}rem !important`,
    },
  })
);

export const CenteredProgress = ({ spinnerSize }: Props) => {
  const classes = useStyles({ spinnerSize: spinnerSize || 5 });
  return (
    <div className={classes.container}>
      <CircularProgress className={classes.progress} />
    </div>
  );
};
