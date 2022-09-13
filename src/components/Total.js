
import ClassIcon from '@mui/icons-material/Class';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useTheme } from '@emotion/react';
import { Avatar, Card, CardContent, colors, Grid, Typography } from '@mui/material';




const Total = ({ className, Icon, name, count, ...rest }) => {
    const theme = useTheme();
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
    return (
        <Card
            sx={styles.root}
        >
            <CardContent>
                <Grid
                    container
                    justify="space-between"
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
                            variant="h3"
                        >
                            {count}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar sx={styles.avatar}>
                            <Icon />
                        </Avatar>
                    </Grid>
                </Grid>


            </CardContent>
        </Card>
    );
};

export default Total;

