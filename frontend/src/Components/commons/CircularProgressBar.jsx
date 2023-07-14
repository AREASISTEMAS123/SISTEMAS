import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

function CVCircularProgress({ value, color }) {
	return (
		<Box sx={{ position: 'relative' }}>
			<CircularProgress
				variant="determinate"
				sx={{
					color: '#16232B'
				}}
				size={150}
				thickness={4}
				value={100}
			/>
			<CircularProgress
				variant="determinate"
				sx={{
					position: 'absolute',
					left: 0,
				}}
				size={150}
				thickness={4}
				value={value} style={{ color }}
			/>
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: 'absolute',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography variant="caption" component="div" color={'#ffffff'} sx={{ fontSize: 30, fontWeight: 900 }}>
					{`${Math.round(value)}%`}
				</Typography>
			</Box>
		</Box>
	);
}
CVCircularProgress.propTypes = {
	value: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
};

CircularProgressBar.propTypes = {
	progress: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
}
export default function CircularProgressBar({ progress, color }) {
	return <CVCircularProgress value={progress} color={color} />
}