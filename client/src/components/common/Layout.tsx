import Grid, { GridProps } from '@mui/material/Grid';
import Container, { ContainerProps } from '@mui/material/Container';
import { styled } from '@mui/material/styles';

export const PageContainer = styled(Grid)<GridProps>({});

export const LeftBarContainer = styled(Grid)<GridProps>(({ theme }) => ({
  position: 'sticky',
  top: '50px',
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

export const GrayContentContainer = styled(ContentContainer)<ContainerProps>(
  ({ theme }) => ({
    marginTop: '20px',
    backgroundColor: '#dae0e6',
  })
);

export const RightBarContainer = styled(Grid)<GridProps>(({ theme }) => ({
  position: 'sticky',
  top: '50px',
  height: '90vh',
}));
