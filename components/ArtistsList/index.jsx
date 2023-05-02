import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function ArtistsList({ artists }) {
  return (
    <>
      {artists.map((artist, index) => (
        <Artist artist={artist} key={artist.id} position={index + 1} />
      ))}
    </>
  );
}

export default ArtistsList;

const Artist = ({ artist, position }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" height="240" image={artist?.images?.[0]?.url} alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {position}.{artist.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
            except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
