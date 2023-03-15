import { Card } from '@mui/material';
import { Typography } from '@mui/material'

const TrelloCard = () => {
  return (
    <Card style={{width: 280, height: 100, padding: 5, marginLeft: 4 }}>
      <Typography className='gutterButtom'>
        <h4>What would you like to do</h4>
      </Typography>
    </Card>
  )
};

export default TrelloCard;