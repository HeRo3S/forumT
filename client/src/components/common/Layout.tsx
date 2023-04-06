import Grid, { GridProps } from '@mui/material/Grid';
import Container, { ContainerProps } from '@mui/material/Container';
import { styled } from '@mui/material/styles';

export const PageContainer = styled(Grid)<GridProps>({});

export const LeftBarContainer = styled(Grid)<GridProps>(({ theme }) => ({
  height: '95vh',
  backgroundColor: theme.palette.grey[400],
}));

export const ContentContainer = styled(Container)<ContainerProps>(
  ({ theme }) => ({
    width: '800px',
    marginBottom: '20px',
    padding: '0 0',
    cursor: 'pointer',
  })
);

export const RightBarContainer = styled(Grid)<GridProps>(({ theme }) => ({}));
