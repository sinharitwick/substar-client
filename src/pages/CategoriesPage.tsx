import React from 'react'
import { IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material'

function CategoriesPage() {
    const itemData = [
      {
        img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhqpTldQEzwaITrjettN6OoK4AHIYOjt9Uri0waSxDMdEw-swGFvkrShcoxA5tNbzvzUBtTraEQCdZEyJ_0N064VMWYR3Vw4alt_AtvjvLY30olCHOb8Rz-pjdGZJ9YOZiUf1whAzkeBePg9M9abND7j8_95MgXe7-jXtXuv6APvb8fgz_X6sHU590t/s1800/music%20sticker%20badge%20for%20ptomotion%20freeject%201.jpg',
        title: 'Music',
        author: '@bkristastucchio',
      },
      {
        img: 'https://cdn.dotpe.in/longtail/store-logo/8378377/YlGa4bG2.jpeg',
        title: 'OTT',
        author: '@rollelflex_graphy726',
      },
      {
        img: 'https://miro.medium.com/v2/resize:fit:1400/1*lsre0hF1Q7zG_O7NoTwjJQ.jpeg',
        title: 'Productivity',
        author: '@helloimnik',
      },
      {
        img: 'https://media.wired.com/photos/5fc597f0a0c817edec9eeaf8/3:2/w_2560%2Cc_limit/games_streaming.jpg',
        title: 'Gaming',
        author: '@nolanissac',
      },
    ];
  return (
    <div>
        <Typography fontWeight='bold' variant='h6' sx={{ fontFamily: 'monospace', mb: 4 }}>Categories</Typography>
        <ImageList sx={{ width: 500, height: 450 }}>
          {itemData.map((item) => (
            <ImageListItem key={item.img} sx={{ cursor: 'pointer' }}>
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.title}`}
                  >
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
    </div>
  )
}

export default CategoriesPage