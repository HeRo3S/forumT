import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <p>NotFound</p>
      <Button variant="contained">
        <Link to="/">GO HOME</Link>
      </Button>
    </div>
  );
}

export default NotFound;
