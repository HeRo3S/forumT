import Container, { ContainerProps } from '@mui/material/Container';
import { styled } from '@mui/material/styles';

const ContentContainer = styled(Container)<ContainerProps>(({ theme }) => ({
  width: '800px',
  marginBottom: '20px',
  padding: '0 0',
  cursor: 'pointer',
}));

const CardContainer = styled;

export default ContentContainer;
