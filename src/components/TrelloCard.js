import { Card, Typography, CardContent } from '@mui/material';

const TrelloCard = ({ title, description }) => {
  return (
    <Card sx={{ width: 280, height: 100, p: 2, m: 1 }}>
      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TrelloCard;