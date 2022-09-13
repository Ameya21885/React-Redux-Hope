import { useTheme } from '@emotion/react';
import { Avatar, Card, CardContent, colors, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Budget = ({  name, icon, number }) => {
const theme =  useTheme()
    const styles = {
        root: {
            height: '100%'
        },
        avatar: {
            backgroundColor: colors.red[600],
            height: 56,
            width: 56
        },
        differenceIcon: {
            color: colors.red[900]
        },
        differenceValue: {
            color: colors.red[900],
            marginRight: theme.spacing(1)
        }
    };

    const Icon = icon

    return (
        <Card
            sx={styles.root}
        >
            <CardContent>
                <Grid
                    container
                    sx={{
                        display: "flex",
                    justifyContent :"space-between"

                    }}
                    spacing={3}
                >
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="h6"
                        >
                            {name}
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {number}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar sx={styles.avatar}>
                            <Icon />
                        </Avatar>
                    </Grid>
                </Grid>
                <Box
                    mt={2}
                    sx={{
                        display:"flex",
                        alignItems:"center"
                    }}
                   
                >
                    {/* <ArrowDownwardIcon className={classes.differenceIcon} />
                    <Typography
                        className={classes.differenceValue}
                        variant="body2"
                    >
                        12%
          </Typography> */}
                    <Typography
                        color="textSecondary"
                        variant="caption"
                    >
                        Total Number Of {name}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};


export default Budget;